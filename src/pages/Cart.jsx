import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './Cart.module.css'

export function Cart() {
  const { carrito, removeFromCart, clearCart, totalItems, totalPrecio } = useCart()

  if (carrito.length === 0) {
    return (
      <div className={styles.empty}>
        <h2 className={styles.title}>Tu carrito está vacío</h2>
        <Link to="/productos" className={styles.link}>Ver productos</Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tu Carrito ({totalItems} productos)</h2>
      <div className={styles.items}>
        {carrito.map(item => (
          <div key={item.id} className={styles.item}>
            <img src={item.imagen} alt={item.nombre} className={styles.image} />
            <div className={styles.info}>
              <h3 className={styles.name}>{item.nombre}</h3>
              <p className={styles.itemPrice}>$ {item.precio.toLocaleString('es-AR')} c/u</p>
              <p className={styles.subtotal}>Subtotal: $ {(item.precio * item.cantidad).toLocaleString('es-AR')}</p>
              <p className={styles.cantidad}>Cantidad: {item.cantidad}</p>
            </div>
            <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <p className={styles.total}>Total: $ {totalPrecio.toLocaleString('es-AR')}</p>
        <div className={styles.actions}>
          <button className={styles.clearBtn} onClick={clearCart}>Vaciar carrito</button>
          <button className={styles.checkoutBtn}>Finalizar compra</button>
        </div>
      </div>
    </div>
  )
}
