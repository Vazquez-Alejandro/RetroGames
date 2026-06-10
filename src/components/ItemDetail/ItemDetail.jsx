import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNotify } from "../../context/NotificationContext";
import { Count } from "../Count/Count";
import { Item } from "../Item/Item";

export const ItemDetail = ({ item }) => {
  const { addItem, getCantidadActual } = useCart();
  const { notify } = useNotify();
  const enCarrito = getCantidadActual(item.id);
  const [toAdd, setToAdd] = useState(0);
  const stockDisponible = item.stock - enCarrito;
  const sinStock = stockDisponible <= 0;
  const puedeAgregar = toAdd < stockDisponible;

  const increment = () => {
    if (puedeAgregar) setToAdd(toAdd + 1);
  };

  const decrement = () => {
    if (toAdd > 0) setToAdd(toAdd - 1);
  };

  const handleAdd = () => {
    if (toAdd === 0) return;
    addItem(item, toAdd);
    notify(`Agregaste ${toAdd} unidad(es) de "${item.name}"`);
    setToAdd(0);
  };

  return (
    <Item {...item}>
      {enCarrito > 0 && <p style={{ color: "#e0e0e0", fontSize: "0.7rem" }}>En carrito: {enCarrito}</p>}
      <Count count={toAdd} increment={increment} decrement={decrement} />
      <button
        className="btn bg-primary primary"
        onClick={handleAdd}
        disabled={toAdd === 0 || sinStock}
      >
        {sinStock ? "Sin stock" : `Agregar ${toAdd > 0 ? toAdd : ""} al carrito`}
      </button>
    </Item>
  );
};
