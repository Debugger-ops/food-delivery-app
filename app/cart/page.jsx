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
  const { cartProducts = [], removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({
    phone: '',
    streetAddress: '',
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
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  if (Array.isArray(cartProducts) && cartProducts.length > 0) {
    for (const p of cartProducts) {
      subtotal += cartProductPrice(p);
    }
  }

  function handleAddressChange(propName, value) {
    setAddress(prev => ({ ...prev, [propName]: value }));
  }

  function proceedToCheckout(ev) {
    ev.preventDefault();
    // Store cart and address in localStorage
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    localStorage.setItem('address', JSON.stringify(address));
    router.push('/checkout'); // navigate to your custom checkout page
  }

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
        <div className="cart-items">
          <h2>Cart Items</h2>
          
          {cartProducts.length === 0 && (
            <div className="empty-items-message">No items in your cart</div>
          )}
          
          <div className="cart-items-list">
            {cartProducts.map((product, index) => (
              <CartProduct 
                key={index} 
                product={product} 
                index={index}
                onRemove={removeCartProduct} 
              />
            ))}
          </div>
        </div>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Delivery:</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          
          <div className="summary-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className="address-form">
            <h3>Delivery Address</h3>
            <form onSubmit={proceedToCheckout}>
              <AddressInputs 
                addressProps={address} 
                setAddressProp={handleAddressChange} 
              />
              
              <button 
                type="submit" 
                className="checkout-btn"
              >
                <span>Proceed to Checkout</span>
                <span className="checkout-btn-price">${total.toFixed(2)}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}