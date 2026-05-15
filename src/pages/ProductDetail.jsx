import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Count } from '../components/Count/Count'
import styles from './ProductDetail.module.css'

export function ProductDetail() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [cantidad, setCantidad] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    fetch('/data/productos.json')
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar el producto')
        return res.json()
      })
      .then(data => {
        const prod = data.find(p => p.id === Number(id))
        if (!prod) throw new Error('Producto no encontrado')
        setProducto(prod)
      })
      .catch(err => setError(err.message))
      .finally(() => setCargando(false))
  }, [id])

  if (cargando) return <div className={styles.loading}>Cargando producto...</div>
  if (error) return <div className={styles.error}>Error: {error}</div>
  if (!producto) return <div className={styles.error}>Producto no encontrado</div>

  const incrementar = () => {
    if (cantidad < producto.stock) setCantidad(cantidad + 1)
  }

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1)
  }

  const handleAgregar = () => {
    addToCart(producto, cantidad)
    alert(`Agregaste ${cantidad} unidad(es) de "${producto.nombre}" al carrito`)
  }

  return (
    <div className={styles.container}>
      <Link to="/productos" className={styles.backLink}>&larr; Volver a productos</Link>
      <div className={styles.content}>
        <img src={producto.imagen} alt={producto.nombre} className={styles.image} />
        <div className={styles.info}>
          <h2 className={styles.name}>{producto.nombre}</h2>
          <p className={styles.price}>$ {producto.precio.toLocaleString('es-AR')}</p>
          <p className={styles.stock}>Stock: {producto.stock} unidad(es)</p>
          {producto.descripcion && <p className={styles.description}>{producto.descripcion}</p>}
          <div className={styles.addSection}>
            <Count cantidad={cantidad} incrementar={incrementar} decrementar={decrementar} />
            <button className={styles.addBtn} onClick={handleAgregar}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
