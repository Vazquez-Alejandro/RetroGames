import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNotify } from "../../context/NotificationContext";
import { Count } from "../Count/Count";
import { Item } from "../Item/Item";

export const ItemDetail = ({ item }) => {
  const [count, setCount] = useState(1);
  const { addItem } = useCart();
  const { notify } = useNotify();

  const increment = () => {
    if (count < item.stock) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleAdd = () => {
    addItem(item, count);
    notify(`Agregaste ${count} unidad(es) de "${item.name}"`);
    setCount(1);
  };

  return (
    <Item {...item}>
      <Count count={count} increment={increment} decrement={decrement} />
      <button className="btn bg-primary primary" onClick={handleAdd}>
        Agregar al carrito
      </button>
    </Item>
  );
};
