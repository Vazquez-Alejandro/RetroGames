import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

export function Home() {
  const [destacados, setDestacados] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('/data/productos.json')
      .then(res => res.json())
      .then(data => {
        const juegos = data.find(p => p.categoria === 'juegos')
        const consolas = data.find(p => p.categoria === 'consolas')
        const accesorios = data.find(p => p.categoria === 'accesorios')
        setDestacados([juegos, consolas, accesorios].filter(Boolean))
      })
      .catch(() => {})
      .finally(() => setCargando(false))
  }, [])

  return (
    <div>
      <section className={styles.hero}>
        <p className={styles.welcome}>Bienvenido</p>
        <h1 className={styles.title}>Retro Games</h1>
        <p className={styles.subtitle}>Los mejores juegos, consolas y accesorios retro</p>
        <Link to="/productos" className={styles.ctaLink}>Ver catálogo completo</Link>
      </section>

      <h2 className={styles.sectionTitle}>Productos Destacados</h2>

      {cargando ? (
        <p className={styles.loading}>Cargando...</p>
      ) : (
        <div className={styles.grid}>
          {destacados.map(producto => (
            <Link
              key={producto.id}
              to={`/producto/${producto.id}`}
              className={styles.card}
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className={styles.cardImage}
              />
              <h3 className={styles.cardName}>{producto.nombre}</h3>
              {producto.descripcion && (
                <p className={styles.cardDescription}>{producto.descripcion}</p>
              )}
              <p className={styles.cardPrice}>
                $ {producto.precio.toLocaleString('es-AR')}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
