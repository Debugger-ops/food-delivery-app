import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  cartItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  subtotal: Number,
  deliveryFee: Number,
  totalAmount: Number,
  address: {
    phone: String,
    streetAddress: String,
    postalCode: String,
    city: String,
    country: String,
  },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
