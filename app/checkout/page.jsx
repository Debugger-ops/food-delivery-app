'use client';
import { useEffect, useState } from 'react';
import SectionHeaders from '@/components/layout/SectionHeaders';
import './checkout.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [cartProducts, setCartProducts] = useState([]);
  const [address, setAddress] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedAddress = JSON.parse(localStorage.getItem('address')) || {};
    setCartProducts(storedCart);
    setAddress(storedAddress);

    let total = 0;
    for (const product of storedCart) {
      const price = product.basePrice || 0;
      const extrasPrice = product.extras?.reduce((sum, extra) => sum + extra.price, 0) || 0;
      total += (price + extrasPrice) * product.quantity;
    }
    setSubtotal(total);
  }, []);

  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

  function handleFakePayment() {
    setLoading(true);
    toast.loading('Processing payment...', { id: 'pay' });

    setTimeout(() => {
      toast.success('Payment successful! 🎉', { id: 'pay' });

      // Clear localStorage
      localStorage.removeItem('cart');
      localStorage.removeItem('address');

      // Redirect after success
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }, 2000);
  }

  return (
    <section className="checkout-page">
      <div className="text-center">
        <SectionHeaders mainHeader="Checkout" />
      </div>

      <div className="checkout-content">
        <div className="order-summary">
          <h2>Order Summary</h2>
          {cartProducts.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cartProducts.map((product, index) => (
                <li key={index}>
                  <strong>{product.name}</strong> x {product.quantity}
                  <br />
                  ${((product.basePrice || 0) +
                    (product.extras?.reduce((sum, e) => sum + e.price, 0) || 0)) *
                    product.quantity}
                </li>
              ))}
            </ul>
          )}
          <div className="price-summary">
            <p>Subtotal: ${subtotal}</p>
            <p>Delivery Fee: ${deliveryFee}</p>
            <p><strong>Total: ${total}</strong></p>
          </div>
        </div>

        <div className="address-summary">
          <h2>Delivery Address</h2>
          {address?.city ? (
            <p>
              {address.streetAddress},<br />
              {address.city}, {address.postalCode},<br />
              {address.country}<br />
              Phone: {address.phone}
            </p>
          ) : (
            <p>No address provided.</p>
          )}
        </div>

        {cartProducts.length > 0 && (
          <div className="payment-button">
            <button
              onClick={handleFakePayment}
              className="checkout-button"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay $${total}`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
