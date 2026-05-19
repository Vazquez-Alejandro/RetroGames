import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";

export const CartView = () => {
  const { cart } = useCart();

  return (
    <section>
      <h1>Tu carrito de compras</h1>

      {cart.length ? (
        <>
          <CartList />
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
