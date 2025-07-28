import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/libs/mongoConnect";
import Order from "@/models/Order";
import mongoose from "mongoose";

export async function POST(request) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(
      JSON.stringify({ success: false, message: "Not authenticated" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { user } = session;
  const { address, cartProducts } = await request.json();

  if (!address || !cartProducts || !Array.isArray(cartProducts)) {
    return new Response(
      JSON.stringify({ success: false, message: "Missing required fields" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Validate and format cart items
    const updatedCartProducts = cartProducts.map((product) => {
      if (!mongoose.Types.ObjectId.isValid(product._id)) {
        throw new Error(`Invalid product ID: ${product._id}`);
      }

      return {
        _id: new mongoose.Types.ObjectId(product._id),
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
      };
    });

    // Calculate subtotal and total
    const subtotal = updatedCartProducts.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const deliveryFee = 50;
    const totalAmount = subtotal + deliveryFee;

    // Create the order
    const orderDoc = await Order.create({
      userEmail: user.email,
      address,
      cartProducts: updatedCartProducts,
      subtotal,
      deliveryFee,
      totalAmount,
    });

    return new Response(
      JSON.stringify({ success: true, order: orderDoc }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
