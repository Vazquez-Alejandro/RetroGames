import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from './Nav.module.css'

export const Nav = () => {
  const { totalItems } = useCart()

  return (
    <nav>
      <ul className={styles.navList}>
        <li className={styles.navItem}><Link to="/">Inicio</Link></li>
        <li className={styles.navItem}><Link to="/productos">Productos</Link></li>
        <li className={styles.navItem}>
          <Link to="/carrito" className={styles.cartLink}>
            Carrito
            {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  )
}
