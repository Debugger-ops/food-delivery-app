"use client";
import { createContext, useEffect, useState } from "react";

// Utility function to calculate product price (including extras)
export function cartProductPrice(product) {
    // Ensure basePrice and extras are properly handled.
    const basePrice = product.basePrice || 0; // default to 0 if missing
    const extrasPrice = (product.extras || []).reduce((sum, extra) => sum + (extra.price || 0), 0); // fallback to 0 if no extras
    return basePrice + extrasPrice;
  }
  

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartProducts(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }, [cartProducts]);

  function addToCart(product) {
    setCartProducts(prev => {
      const existingIndex = prev.findIndex(p => JSON.stringify(p) === JSON.stringify(product));
      if (existingIndex >= 0) {
        // If same product+extras exists, increase quantity
        const updated = [...prev];
        updated[existingIndex].quantity = (updated[existingIndex].quantity || 1) + 1;
        return updated;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeCartProduct(index) {
    setCartProducts(prev => prev.filter((_, i) => i !== index));
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider value={{ cartProducts, addToCart, removeCartProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
