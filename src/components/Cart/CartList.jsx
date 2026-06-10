import { useCart } from "../../context/CartContext";
import { CartItem } from "./CartItem";
import styles from "./Cart.module.css";

export const CartList = () => {
  const { cart } = useCart();

  return (
    <div className={styles.cartList}>
      {cart.map((element) => (
        <div key={element.id} className={styles.cartItemWrapper}>
          <CartItem item={element} />
        </div>
      ))}
    </div>
  );
};
