import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import styles from "./Nav.module.css";

export const Nav = () => {
  const { getTotalItems } = useCart();
  const { user } = useAuth();
  const totalItems = getTotalItems();

  return (
    <nav>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Inicio
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/productos"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Productos
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/carrito"
            className={({ isActive }) =>
              `${styles.cartLink}${isActive ? ` ${styles.active}` : ""}`
            }
          >
            Carrito
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </NavLink>
        </li>
        {user && user.rol === "admin" && (
          <>
            <li className={styles.navItem}>
              <NavLink
                to="/admin/productos"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Admin
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/admin/cupones"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cupones
              </NavLink>
            </li>
          </>
        )}
        <li className={styles.navItem}>
          {user ? (
            <>
              <span className={styles.userEmail}>{user.email}</span>
              <NavLink
                to="/perfil"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Perfil
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Ingresar
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};
