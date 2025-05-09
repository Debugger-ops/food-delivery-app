import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  address: {
    streetAddress: String,
    city: String,
    postalCode: String,
    country: String,
    phone: Number,
  },
  cartProducts: [
    {
      name: String,
      quantity: Number,
      basePrice: Number,
      extras: Array,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;  // Ensure you're exporting the model as default
