import styles from './Nav.module.css'

export const Nav = () => {
  return (
    <nav>
      <ul className={styles.navList}>
        <li className={styles.navItem}>Inicio</li>
        <li className={styles.navItem}>Productos</li>
        <li className={styles.navItem}>Carrito</li>
        <li className={styles.navItem}>Contacto</li>
      </ul>
    </nav>
  )
}
