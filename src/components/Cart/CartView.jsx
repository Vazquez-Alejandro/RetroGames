import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useNotify } from "../../context/NotificationContext";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import styles from "./Cart.module.css";

export const CartView = () => {
  const { cart } = useCart();
  const { notify } = useNotify();

  const handleConfirm = () => {
    notify("Cambios confirmados");
  };

  return (
    <section className={styles.cartContainer}>
      <Link to="/productos" className={styles.backLink}>
        &larr; Volver a productos
      </Link>
      <h1>Tu carrito de compras</h1>

      {cart.length ? (
        <>
          <CartList />
          <div className={styles.actions}>
            <button className={styles.confirmBtn} onClick={handleConfirm}>
              Confirmar cambios
            </button>
          </div>
          <CartSummary />
        </>
      ) : (
        <>
          <p>El carrito esta vacío</p>
          <Link className="btn bg-primary primary" to={"/"}>
            Volver
          </Link>
        </>
      )}
    </section>
  );
};
