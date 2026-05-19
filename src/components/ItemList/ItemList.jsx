import { Link } from "react-router-dom";
import { Item } from "../Item/Item";
import styles from "./ItemList.module.css";

export const ItemList = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className={styles.grid}>
        <p className={styles.empty}>No hay productos en esta categoría</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className={styles.link}
        >
          <Item {...product} />
        </Link>
      ))}
    </div>
  );
};
