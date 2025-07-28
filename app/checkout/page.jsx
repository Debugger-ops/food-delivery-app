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
  const [addressLoading, setAddressLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [atmPin, setAtmPin] = useState('');
  const [upiId, setUpiId] = useState('');

  const handleUpiIdChange = (e) => {
    setUpiId(e.target.value);
  };

  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedAddress = JSON.parse(localStorage.getItem('address')) || {};
    setCartProducts(storedCart);
    setAddress(storedAddress);
    setAddressLoading(false);

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

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

 

  async function handlePayment() {
    setLoading(true);
    toast.loading('Processing payment...', { id: 'pay' });

    try {
      // Validate payment details based on method
      if (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') {
        if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
          throw new Error('Please fill in all card details');
        }
      } else if (paymentMethod === 'atmPin') {
        if (!atmPin || atmPin.length !== 4) {
          throw new Error('Please enter a valid 4-digit PIN');
        }
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartProducts,
          address,
          paymentMethod,
          paymentDetails:
            paymentMethod === 'creditCard' || paymentMethod === 'debitCard'
              ? cardDetails
              : paymentMethod === 'atmPin'
                ? { pin: atmPin }
                : { cashOnDelivery: true }
        }),
      });

      if (!response.ok) {
        throw new Error('Payment gateway error');
      }

      const data = await response.json();

      if (data.success) {
        toast.success('Payment successful! 🎉', { id: 'pay' });
        const order = {
          cartProducts,
          address,
          total,
          paymentMethod,
          paymentDetails: paymentMethod === 'creditCard' || paymentMethod === 'debitCard' ? cardDetails : paymentMethod === 'atmPin' ? { pin: atmPin } : { cashOnDelivery: true },
        };
        // Clear localStorage
        localStorage.removeItem('cart');
        localStorage.removeItem('address');

        // Redirect after success
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        throw new Error(data.message || 'Payment failed');
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`, { id: 'pay' });
    } finally {
      setLoading(false);
    }
  }

  const renderPaymentMethodForm = () => {
    switch (paymentMethod) {
      case 'creditCard':
      case 'debitCard':
        return (
          <div className="card-payment-form">
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="number"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={handleCardInputChange}
                maxLength="19"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                type="text"
                id="cardName"
                name="name"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={handleCardInputChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cardExpiry">Expiry Date</label>
                <input
                  type="text"
                  id="cardExpiry"
                  name="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={handleCardInputChange}
                  maxLength="5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cardCvv">CVV</label>
                <input
                  type="password"
                  id="cardCvv"
                  name="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                  maxLength="4"
                />
              </div>
            </div>
          </div>
        );
      case 'upi':
        return (
          <div className="upi-payment-form">
            <div className="form-group">
              <label htmlFor="upiId">Enter UPI ID</label>
              <input
                type="text"
                id="upiId"
                placeholder="example@upi"
                value={upiId}
                onChange={handleUpiIdChange}
              />
              <p className="upi-note">
                Your UPI ID will be used to securely process the payment.
              </p>
            </div>
          </div>
        );
      case 'cashOnDelivery':
        return (
          <div className="cash-payment-info">
            <p>You will pay ${total.toFixed(2)} in cash upon delivery.</p>
            <p>Please have the exact amount ready for our delivery person.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="checkout-page">
      <div className="checkout-header">
        <SectionHeaders mainHeader="Checkout" />
      </div>

      <div className="checkout-content">

        {cartProducts.length > 0 && (
          <div className="checkout-card payment-methods">
            <h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
              </svg>
              Payment Method
            </h2>

            <div className="payment-options">
              <div className="payment-option">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === 'creditCard'}
                  onChange={() => setPaymentMethod('creditCard')}
                />
                <label htmlFor="creditCard">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                  </svg>
                  Credit Card
                </label>
              </div>

              <div className="payment-option">
                <input
                  type="radio"
                  id="debitCard"
                  name="paymentMethod"
                  value="debitCard"
                  checked={paymentMethod === 'debitCard'}
                  onChange={() => setPaymentMethod('debitCard')}
                />
                <label htmlFor="debitCard">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4z" />
                    <path d="M0 7v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7H0zm3 2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z" />
                  </svg>
                  Debit Card
                </label>
              </div>

              <div className="payment-option">
                <input
                  type="radio"
                  id="upi"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                />
                <label htmlFor="upi">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h18a1 1 0 0 1 .97 1.243l-3 12A1 1 0 0 1 18 17H6a1 1 0 0 1-.97-.757l-3-12A1 1 0 0 1 3 3zm15.74 2H5.26l2.5 10h10.48l2.5-10zM12 8a1 1 0 0 1 1 1v1.586l.707.707a1 1 0 0 1-1.414 1.414L11 11.414V9a1 1 0 0 1 1-1z" />
                  </svg>
                  UPI Payment
                </label>
              </div>

              <div className="payment-option">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={paymentMethod === 'cashOnDelivery'}
                  onChange={() => setPaymentMethod('cashOnDelivery')}
                />
                <label htmlFor="cashOnDelivery">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                  </svg>
                  Cash on Delivery
                </label>
              </div>
            </div>

            <div className="payment-form">
              {renderPaymentMethodForm()}
            </div>
          </div>
        )}
      </div>

      {cartProducts.length > 0 && (
        <div className="payment-section">
          <button
            onClick={handlePayment}
            className="checkout-button"
            disabled={loading}
            aria-label="Proceed to payment"
          >
            {loading ? (
              <>
                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" />
                  <path d="M12,4a8,8,0,1,1-8,8A8,8,0,0,1,12,4Zm0,14A6,6,0,1,0,6,12,6,6,0,0,0,12,18Z" />
                </svg>
                Processing...
              </>
            ) : (
              paymentMethod === 'cashOnDelivery' ? 'Confirm Order' : 'Pay Now'
            )}
          </button>
        </div>
      )}
    </section>
  );
}