import { Link } from 'react-router-dom'
import { Item } from '../Item/Item'
import styles from './ItemList.module.css'

export function ItemList({ productos }) {
  if (!productos || productos.length === 0) {
    return (
      <div className={styles.grid}>
        <p className={styles.empty}>No hay productos en esta categoría</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {productos.map(prod => (
        <Link key={prod.id} to={`/producto/${prod.id}`} className={styles.link}>
          <Item {...prod} />
        </Link>
      ))}
    </div>
  )
}
