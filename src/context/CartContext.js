import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  // (1) Initialize cart state from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  // Helper function to clear the cart
  const clearCart = () => {
    localStorage.removeItem("cartItems");
    setCartItems({});
  };

  // Access the current location if needed for more advanced checks
  const location = useLocation();

  // (2) Show the SweetAlert pop-up ONLY if we're on the menu page (i.e. URL contains a menu id)
  useEffect(() => {
    // Parse URL params for a menu id
    const urlParams = new URLSearchParams(window.location.search);
    const menuId = urlParams.get("id");

    // Only proceed if a menu id exists (i.e. we're on the menu page)
    if (!menuId) return;

    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      // Check if there's at least one item with quantity > 0
      const hasItems = Object.values(parsedCart).some((qty) => qty > 0);
      if (hasItems) {
        Swal.fire({
          title: "Continue Order?",
          text: "You created an order previously that you didn’t finish. Would you like to continue from where you left off?",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Yes, continue",
          cancelButtonText: "No, start new",
        }).then((result) => {
          if (result.isDismissed) {
            // User chose "No, start new" or closed the popup
            clearCart();
          }
          // If user chooses "Yes, continue", keep the existing cart
        });
      }
    }
  }, [location]);

  // (3) Persist cart changes to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart utility functions
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const addToCartModal = (itemId, quantity) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + quantity,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      return { ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) };
    });
  };

  const removeAllFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
  };

  // If you need the total price, pass in products array
  const getTotalCartAmount = (products) => {
    let total = 0;
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      const product = products?.find((p) => p.id === itemId);
      if (product && quantity > 0) {
        total += product.price * quantity;
      }
    }
    return total;
  };

  const cartContextValue = {
    cartItems,
    addToCart,
    addToCartModal,
    removeFromCart,
    removeAllFromCart,
    clearCart,
    getTotalCartAmount,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}
