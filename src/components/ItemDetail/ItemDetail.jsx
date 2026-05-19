import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Count } from "../Count/Count";
import { Item } from "../Item/Item";

export const ItemDetail = ({ item }) => {
  const [count, setCount] = useState(1);
  const { addItem } = useCart();

  const increment = () => {
    if (count < item.stock) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleAdd = () => {
    addItem(item, count);
    alert(`Agregaste ${count} unidad(es) de "${item.name}" al carrito`);
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
