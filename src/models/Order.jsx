import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    address: {
      phone: String,
      address: String, // streetAddress renamed to address
      city: String,
      postalCode: String,
      country: String,
    },
    cartProducts: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.models?.Order || mongoose.model("Order", orderSchema);
export default Order;
