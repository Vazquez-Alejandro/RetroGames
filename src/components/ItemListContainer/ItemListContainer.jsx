import { useState, useEffect } from "react";
import { ItemList } from "../ItemList/ItemList";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./ItemListContainer.module.css";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("juegos");

  const categories = [
    { key: "juegos", label: "Juegos", img: "/images/juegos.png" },
    { key: "consolas", label: "Consolas", img: "/images/consolas.png" },
    { key: "accesorios", label: "Accesorios", img: "/images/accesorios.png" },
  ];

  const filteredProducts = products.filter(
    (p) => p.category === category
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.filterBar}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`${styles.filterBtn} ${category === cat.key ? styles.filterBtnActive : ""}`}
            onClick={() => setCategory(cat.key)}
          >
            <img src={cat.img} alt={cat.label} className={styles.filterImg} />
          </button>
        ))}
      </div>
      <ItemList products={filteredProducts} />
    </div>
  );
};
