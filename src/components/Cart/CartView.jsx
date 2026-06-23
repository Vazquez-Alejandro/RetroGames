import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useNotify } from "../../context/NotificationContext";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import styles from "./Cart.module.css";
import { useState } from "react";

export const CartView = () => {
  const { cart, applyCoupon, removeCoupon, coupon } = useCart();
  const { notify } = useNotify();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const handleApply = async () => {
    if (!code.trim()) return;
    const res = await applyCoupon(code);
    if (res.error) {
      setMsg(res.error);
    } else {
      setMsg(`¡Cupón aplicado! ${res.cupon.porcentaje}% off`);
      setCode("");
    }
  };

  const handleRemove = () => {
    removeCoupon();
    setMsg("");
  };

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
          <div className={styles.couponSection}>
            {coupon ? (
              <div className={styles.couponActive}>
                <span>Cupón: <strong>{coupon.codigo}</strong> ({coupon.porcentaje}% descuento)</span>
                <button className={styles.removeCouponBtn} onClick={handleRemove}>Quitar</button>
              </div>
            ) : (
              <div className={styles.couponInput}>
                <input
                  type="text"
                  placeholder="Código de cupón"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={styles.couponField}
                />
                <button className={styles.applyBtn} onClick={handleApply}>Aplicar</button>
              </div>
            )}
            {msg && <p className={msg.includes("inválido") ? styles.couponError : styles.couponSuccess}>{msg}</p>}
          </div>
          <div className={styles.actions}>
            <button className={styles.confirmBtn} onClick={handleConfirm} aria-label="Confirmar cambios en el carrito">
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
