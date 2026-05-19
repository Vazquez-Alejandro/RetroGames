import styles from "./Count.module.css";

export const Count = ({ count, increment, decrement }) => {
  return (
    <div className={styles.counter}>
      <button
        className={styles.btn}
        onClick={decrement}
        disabled={count === 0}
      >
        -
      </button>
      <span className={styles.quantity}>{count}</span>
      <button className={styles.btn} onClick={increment}>
        +
      </button>
    </div>
  );
};
