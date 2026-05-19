import { useCart } from "../../context/CartContext";
import { Item } from "../Item/Item";

export const CartItem = ({ item }) => {
  const { removeItem, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <Item {...item}>
      <div>
        <button
          className="btn bg-delete primary"
          onClick={() => decreaseQuantity(item.id)}
        >
          -
        </button>
        <span style={{ margin: "0 8px" }}>{item.quantity}</span>
        <button
          className="btn bg-primary primary"
          onClick={() => increaseQuantity(item.id)}
        >
          +
        </button>
      </div>
      <p>
        Subtotal: $ {(item.price * item.quantity).toLocaleString("es-AR")}
      </p>
      <button
        className="btn bg-delete primary"
        onClick={() => removeItem(item.id)}
      >
        Eliminar todo
      </button>
    </Item>
  );
};
