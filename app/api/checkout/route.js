import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MenuItem } from "@/models/MenuItem";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function POST(req) {
  await mongoose.connect(process.env.MONGODB_URI);
  const { cartProducts, address } = await req.json();

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  let totalAmount = 0;

  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);
    let productPrice = productInfo.basePrice;

    if (cartProduct.size) {
      const size = productInfo.sizes.find(
        (s) => s._id.toString() === cartProduct.size._id.toString()
      );
      if (size) productPrice += size.price;
    }

    if (cartProduct.extras?.length > 0) {
      for (const extra of cartProduct.extras) {
        const extraInfo = productInfo.extraIngredientPrices.find(
          (e) => e._id.toString() === extra._id.toString()
        );
        if (extraInfo) productPrice += extraInfo.price;
      }
    }

    totalAmount += productPrice;
  }

  const amountInPaise = Math.round((totalAmount + 5) * 100); // ₹5 delivery

  // 💡 Fake payment order (no Razorpay)
  const fakeOrder = {
    orderId: `order_dummy_${orderDoc._id}`,
    amount: amountInPaise,
    currency: "INR",
    payment_url: `/orders/${orderDoc._id}?clear-cart=1`, // redirect to order success
  };

  return Response.json(fakeOrder);
}
