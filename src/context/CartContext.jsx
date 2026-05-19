import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotify } from "./NotificationContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { notify } = useNotify();
  const [cart, setCart] = useState([]);

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  const addItem = (item, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((el) => el.id === item.id);
      if (existing) {
        return prev.map((el) =>
          el.id === item.id
            ? { ...el, quantity: el.quantity + quantity }
            : el
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotalItems = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const checkout = () => {
    notify("¡Compra realizada con éxito!");
    clearCart();
    navigate("/");
  };

  const values = {
    cart,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getTotalItems,
    getCartTotal,
    clearCart,
    checkout,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
