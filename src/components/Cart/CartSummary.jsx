import { useCart } from "../../context/CartContext";

export const CartSummary = () => {
  const { getCartTotal, getSubtotal, checkout, coupon } = useCart();
  const total = getCartTotal();
  const subtotal = getSubtotal();
  const discount = subtotal - total;

  return (
    <>
      <p>Subtotal: $ {subtotal.toLocaleString("es-AR")}</p>
      {coupon && (
        <p>Descuento ({coupon.porcentaje}%): -$ {discount.toLocaleString("es-AR")}</p>
      )}
      <p>TOTAL A PAGAR: $ {total.toLocaleString("es-AR")}</p>
      <button className="btn bg-success primary" onClick={checkout}>
        FINALIZAR COMPRA
      </button>
    </>
  );
};
