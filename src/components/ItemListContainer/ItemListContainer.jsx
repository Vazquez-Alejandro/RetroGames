import { useState, useEffect } from 'react'
import { ItemList } from '../ItemList/ItemList'
import styles from './ItemListContainer.module.css'

export function ItemListContainer({ Mensaje }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [categoria, setCategoria] = useState('juegos')

  const categorias = [
    { key: 'juegos', label: 'Juegos', img: '/images/juegos.png' },
    { key: 'consolas', label: 'Consolas', img: '/images/consolas.png' },
    { key: 'accesorios', label: 'Accesorios', img: '/images/accesorios.png' },
  ]

  const productosFiltrados = productos.filter(p => p.categoria === categoria)

  useEffect(() => {
    fetch('/data/productos.json')
      .then(res => {
        if (!res.ok) throw new Error('No se pudieron cargar los productos')
        return res.json()
      })
      .then(data => {
        setProductos(data)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setCargando(false)
      })
  }, [])



  if (cargando) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Cargando productos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {Mensaje && <h2 className={styles.title}>{Mensaje}</h2>}
      <div className={styles.filterBar}>
        {categorias.map(cat => (
          <button
            key={cat.key}
            className={`${styles.filterBtn} ${categoria === cat.key ? styles.filterBtnActive : ''}`}
            onClick={() => setCategoria(cat.key)}
          >
            <img src={cat.img} alt={cat.label} className={styles.filterImg} />
          </button>
        ))}
      </div>
      <ItemList productos={productosFiltrados} />
    </div>
  )
}
