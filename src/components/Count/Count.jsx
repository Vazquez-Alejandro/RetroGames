import styles from "./Count.module.css";

export const Count = ({ count, increment, decrement }) => {
  const handleDecrement = (e) => {
    e.stopPropagation();
    e.preventDefault();
    decrement();
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    e.preventDefault();
    increment();
  };

  return (
    <div className={styles.counter}>
      <button
        className={styles.btn}
        onClick={handleDecrement}
        disabled={count === 0}
      >
        -
      </button>
      <span className={styles.quantity}>{count}</span>
      <button className={styles.btn} onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};
