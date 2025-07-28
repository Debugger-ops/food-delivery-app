'use client';
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(product) {
  const basePrice = (product.basePrice && product.basePrice !== 0)
    ? Number(product.basePrice)
    : (Number(product.price) || 0);

  const extras = Array.isArray(product.extras) ? product.extras : [];
  const extrasPrice = extras.reduce((sum, extra) => sum + (Number(extra?.price) || 0), 0);

  return (basePrice + extrasPrice) * (product.quantity || 1); // 👈 includes quantity
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      try {
        const storedCart = JSON.parse(ls.getItem('cart'));
        setCartProducts(Array.isArray(storedCart) ? storedCart : []);
      } catch (err) {
        console.error("Error parsing cart from localStorage", err);
      }
    }
  }, []);

  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove) {
    setCartProducts(prevCartProducts => {
      const newCartProducts = prevCartProducts.filter((_, index) => index !== indexToRemove);
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success('Product removed');
  }

  function addToCart(product, size = null, extras = []) {
    const cartProduct = {
      ...product,
      basePrice: Number(product.basePrice) || 0,
      size: size ? { ...size, price: Number(size.price) || 0 } : null,
      extras: extras.map(extra => ({
        ...extra,
        price: Number(extra.price) || 0,
      })),
      quantity: 1,
    };

    setCartProducts(prev => {
      const newCart = [...prev, cartProduct];
      saveCartProductsToLocalStorage(newCart);
      return newCart;
    });
  }

  function increaseQuantity(index) {
    setCartProducts(prev => {
      const newCart = [...prev];
      newCart[index].quantity += 1;
      saveCartProductsToLocalStorage(newCart);
      return newCart;
    });
  }

  function decreaseQuantity(index) {
    setCartProducts(prev => {
      const newCart = [...prev];
      if (newCart[index].quantity > 1) {
        newCart[index].quantity -= 1;
        saveCartProductsToLocalStorage(newCart);
        return newCart;
      } else {
        // Remove item if quantity becomes 0
        return newCart.filter((_, i) => i !== index);
      }
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
          increaseQuantity,
          decreaseQuantity,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
