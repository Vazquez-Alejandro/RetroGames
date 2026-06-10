import { useCart } from "../../context/CartContext";

export const CartSummary = () => {
  const { getCartTotal, checkout } = useCart();
  const total = getCartTotal();

  return (
    <>
      <p>TOTAL A PAGAR: $ {total.toLocaleString("es-AR")}</p>
      <button className="btn bg-success primary" onClick={checkout}>
        FINALIZAR COMPRA
      </button>
    </>
  );
};
