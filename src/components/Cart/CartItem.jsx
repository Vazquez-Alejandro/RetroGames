import { useCart } from "../../context/CartContext";
import { Item } from "../Item/Item";

export const CartItem = ({ item }) => {
  const { removeItem } = useCart();

  return (
    <Item {...item}>
      <p>Cantidad: {item.quantity}</p>
      <p>Subtotal: $ {(item.price * item.quantity).toLocaleString("es-AR")}</p>
      <button
        className="btn bg-delete primary"
        onClick={() => removeItem(item.id)}
      >
        Eliminar
      </button>
    </Item>
  );
};
