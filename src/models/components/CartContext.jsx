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
  // ✅ Validate product._id
  if (!product._id || typeof product._id !== "string" || product._id.length !== 24) {
    console.error("❌ Invalid product._id:", product._id, product);
    return;
  }

  setCartProducts(prev => {
    const existingIndex = prev.findIndex(p => {
      return (
        p._id === product._id &&
        JSON.stringify(p.extras || []) === JSON.stringify(product.extras || [])
      );
    });

    if (existingIndex >= 0) {
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
