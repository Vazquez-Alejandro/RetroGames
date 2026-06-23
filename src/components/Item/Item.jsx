import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNotify } from "../../context/NotificationContext";
import { Count } from "../Count/Count";
import styles from "./Item.module.css";

export const Item = ({ id, name, description, price, image, children, stock }) => {
  const [count, setCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem, getCantidadActual } = useCart();
  const { notify } = useNotify();
  const enCarrito = getCantidadActual(id);
  const stockDisponible = stock - enCarrito;

  const increment = () => {
    if (count < stockDisponible) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (count > 0) {
      addItem({ id, name, price, image }, count);
      notify(`Agregaste ${count} unidad(es) de "${name}"`);
      setCount(0);
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const sinStock = stockDisponible <= 0;

  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
      {description && <p className={styles.description}>{description}</p>}
      <p className={styles.price}>$ {price.toLocaleString("es-AR")}</p>
      {sinStock ? (
        <p className={styles.stock}>Sin stock</p>
      ) : (
        <p className={styles.stock}>Stock: {stockDisponible} unidad(es)</p>
      )}
      {children ? (
        children
      ) : (
        <>
          <Count count={count} increment={increment} decrement={decrement} />
          <div className={styles.actions}>
            <button className={styles.addBtn} onClick={handleAddToCart} disabled={sinStock} aria-label={sinStock ? "Producto sin stock" : `Agregar ${name} al carrito`}>
              {sinStock ? "Sin stock" : "Agregar al carrito"}
            </button>
            <span className={styles.favoriteBtn} onClick={handleFavorite} role="button" aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"} tabIndex={0}>
              {isFavorite ? "⭐" : "☆"}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
