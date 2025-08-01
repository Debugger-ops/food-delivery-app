'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import './cart.css';

export default function CartPage() {
  const {
    cartProducts = [],
    setCartProducts,
    removeCartProduct
  } = useContext(CartContext);

  const [address, setAddress] = useState({
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const { data: profileData } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 😔');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, address, city, postalCode, country } = profileData;
      setAddress({ phone, address, city, postalCode, country });
    }
  }, [profileData]);

  // Quantity Handlers
  const handleIncreaseQty = (index) => {
    const updatedCart = [...cartProducts];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCartProducts(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDecreaseQty = (index) => {
    const updatedCart = [...cartProducts];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartProducts(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const handleAddressChange = (propName, value) => {
    setAddress(prev => ({ ...prev, [propName]: value }));
  };

  const proceedToCheckout = (ev) => {
    ev.preventDefault();
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    localStorage.setItem('address', JSON.stringify(address));
    router.push('/checkout');
  };

  // Subtotal & total
let subtotal = 0;
for (const p of cartProducts) {
  subtotal += cartProductPrice(p); // ✅ already includes quantity
}


  subtotal = Math.max(0, subtotal);

  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

  if (cartProducts?.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your shopping cart is empty 😔</h2>
          <button 
            onClick={() => router.push('/menu')}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <SectionHeaders mainHeader="Your Cart" subHeader="Review your items before checkout" />
      </div>

      <div className="cart-grid">
        {/* Left Column - Cart Items */}
        <div className="cart-items">
          <div className="cart-section-header">
            <h2>Cart Items</h2>
          </div>

          {cartProducts.length === 0 && (
            <div className="empty-items-message">No items in your cart</div>
          )}

          <div className="cart-items-list">
            {cartProducts.map((product, index) => (
              <div className="cart-product-wrapper" key={index}>
                <CartProduct
                  product={product}
                  index={index}
                  onRemove={removeCartProduct}
                  onIncreaseQty={handleIncreaseQty}
                  onDecreaseQty={handleDecreaseQty}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="order-summary">
          <div className="summary-section-header">
            <h2>Order Summary</h2>
          </div>

          <div className="summary-content">
            <div className="summary-row">
              <span className="summary-label">Subtotal:</span>
              <span className="summary-value">₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Delivery:</span>
              <span className="summary-value">₹{deliveryFee.toFixed(2)}</span>
            </div>

            <div className="summary-total">
              <span className="total-label">Total:</span>
              <span className="total-value">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="address-form">
            <div className="address-header">
              <h3>Delivery Address</h3>
            </div>

            <form onSubmit={proceedToCheckout}>
              <div className="address-inputs-container">
                <AddressInputs 
                  addressProps={address}
                  setAddressProp={handleAddressChange}
                />
              </div>

              <button type="submit" className="checkout-btn">
                <span className="checkout-btn-text">Proceed to Checkout</span>
                <span className="checkout-btn-price">₹{total.toFixed(2)}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
