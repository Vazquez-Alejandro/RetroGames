import styles from './Count.module.css'

export function Count({ cantidad, incrementar, decrementar }) {
  return (
    <div className={styles.counter}>
      <button className={styles.btn} onClick={decrementar}>-</button>
      <span className={styles.quantity}>{cantidad}</span>
      <button className={styles.btn} onClick={incrementar}>+</button>
    </div>
  )
}
