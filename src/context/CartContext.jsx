import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotify } from "./NotificationContext";
import { db } from "../firebase/config";
import { doc, updateDoc, getDoc } from "firebase/firestore";

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

  const addItem = async (item, quantity = 1) => {
    try {
      const docRef = doc(db, "productos", item.id);
      const docSnap = await getDoc(docRef);
      const firestoreStock = docSnap.exists() ? docSnap.data().stock : item.stock;

      if (firestoreStock <= 0) return;

      const actualAdd = Math.min(quantity, firestoreStock);

      setCart((prev) => {
        const existing = prev.find((el) => el.id === item.id);
        return existing
          ? prev.map((el) =>
              el.id === item.id
                ? { ...el, quantity: el.quantity + actualAdd }
                : el
            )
          : [...prev, { ...item, quantity: actualAdd }];
      });

      await updateDoc(docRef, { stock: firestoreStock - actualAdd });
    } catch (err) {
      console.error("Error al actualizar stock:", err);
    }
  };

  const removeItem = async (id) => {
    const item = cart.find((el) => el.id === id);
    if (!item) return;

    try {
      const docRef = doc(db, "productos", id);
      const docSnap = await getDoc(docRef);
      const currentStock = docSnap.exists() ? docSnap.data().stock : 0;
      await updateDoc(docRef, { stock: currentStock + item.quantity });
    } catch (err) {
      console.error("Error al restaurar stock:", err);
    }

    setCart((prev) => prev.filter((el) => el.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseQuantity = async (id) => {
    try {
      const docRef = doc(db, "productos", id);
      const docSnap = await getDoc(docRef);
      const firestoreStock = docSnap.exists() ? docSnap.data().stock : 0;
      if (firestoreStock <= 0) return;
      await updateDoc(docRef, { stock: firestoreStock - 1 });
    } catch (err) {
      console.error("Error al actualizar stock:", err);
    }

    setCart((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, quantity: el.quantity + 1 } : el
      )
    );
  };

  const decreaseQuantity = async (id) => {
    const item = cart.find((el) => el.id === id);
    if (!item) return;

    try {
      const docRef = doc(db, "productos", id);
      const docSnap = await getDoc(docRef);
      const currentStock = docSnap.exists() ? docSnap.data().stock : 0;
      await updateDoc(docRef, { stock: currentStock + 1 });
    } catch (err) {
      console.error("Error al restaurar stock:", err);
    }

    if (item.quantity <= 1) {
      setCart((prev) => prev.filter((el) => el.id !== id));
    } else {
      setCart((prev) =>
        prev.map((el) =>
          el.id === id ? { ...el, quantity: el.quantity - 1 } : el
        )
      );
    }
  };

  const getCantidadActual = (productId) => {
    const item = cart.find((el) => el.id === productId);
    return item ? item.quantity : 0;
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
    getCantidadActual,
    getTotalItems,
    getCartTotal,
    clearCart,
    checkout,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
