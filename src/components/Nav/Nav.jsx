import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import styles from "./Nav.module.css";

export const Nav = () => {
  const { getTotalItems } = useCart();
  const { user } = useAuth();
  const totalItems = getTotalItems();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.nav} role="navigation" aria-label="Navegación principal">
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
      >
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ""}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ""}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ""}`} />
      </button>
      <ul className={`${styles.navList} ${menuOpen ? styles.navListOpen : ""}`}>
        <li className={styles.navItem}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={closeMenu}
            aria-label="Ir al inicio"
          >
            Inicio
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/productos"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={closeMenu}
            aria-label="Ver productos"
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
            onClick={closeMenu}
            aria-label={`Carrito de compras${totalItems > 0 ? `, ${totalItems} artículos` : ""}`}
          >
            Carrito
            {totalItems > 0 && (
              <span key={totalItems} className={styles.cartBadge} aria-label={`${totalItems} artículos`}>{totalItems}</span>
            )}
          </NavLink>
        </li>
        {user && user.rol === "admin" && (
          <>
            <li className={styles.navItem}>
              <NavLink
                to="/admin/productos"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={closeMenu}
                aria-label="Administrar productos"
              >
                Admin
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/admin/cupones"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={closeMenu}
                aria-label="Administrar cupones"
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
                onClick={closeMenu}
                aria-label="Ir a mi perfil"
              >
                Perfil
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={closeMenu}
              aria-label="Iniciar sesión"
            >
              Ingresar
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};
