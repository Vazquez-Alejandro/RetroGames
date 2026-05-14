import { useState } from 'react'
import { Count } from '../Count/Count'
import styles from './Item.module.css'

export function Item({ nombre, precio, stock, imagen, descripcion }) {
  const [cantidad, setCantidad] = useState(0)
  const [esFavorito, setEsFavorito] = useState(false)

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1)
    }
  }

  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1)
    }
  }

  const agregarAlCarrito = () => {
    if (cantidad > 0) {
      alert(`Agregaste ${cantidad} unidad(es) de "${nombre}" al carrito`)
    }
  }

  const marcarComoFavorito = () => {
    setEsFavorito(!esFavorito)
  }

  return (
    <div className={styles.card}>
      <img src={imagen} alt={nombre} className={styles.image} />
      <h3 className={styles.name}>{nombre}</h3>
      {descripcion && <p className={styles.description}>{descripcion}</p>}
      <p className={styles.price}>$ {precio.toLocaleString('es-AR')}</p>
      <p className={styles.stock}>Stock: {stock} unidad(es)</p>
      <Count cantidad={cantidad} incrementar={incrementar} decrementar={decrementar} />
      <div className={styles.actions}>
        <button className={styles.addBtn} onClick={agregarAlCarrito}>
          Agregar al carrito
        </button>
        <span className={styles.favoriteBtn} onClick={marcarComoFavorito}>
          {esFavorito ? '⭐' : '☆'}
        </span>
      </div>
    </div>
  )
}
