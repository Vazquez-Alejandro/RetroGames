import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const game = data.find(p => p.category === "juegos");
        const consola = data.find(p => p.category === "consolas");
        const accessory = data.find(p => p.category === "accesorios");
        setFeatured([game, consola, accessory].filter(Boolean));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className={styles.hero}>
        <p className={styles.welcome}>Bienvenido</p>
        <h1 className={styles.title}>Retro Games</h1>
        <p className={styles.subtitle}>
          Los mejores juegos, consolas y accesorios retro
        </p>
        <Link to="/productos" className={styles.ctaLink}>
          Ver catálogo completo
        </Link>
      </section>

      <h2 className={styles.sectionTitle}>Productos Destacados</h2>

      {loading ? (
        <p className={styles.loading}>Cargando...</p>
      ) : (
        <div className={styles.grid}>
          {featured.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={styles.card}
            >
              <img
                src={product.image}
                alt={product.name}
                className={styles.cardImage}
              />
              <h3 className={styles.cardName}>{product.name}</h3>
              {product.description && (
                <p className={styles.cardDescription}>{product.description}</p>
              )}
              <p className={styles.cardPrice}>
                $ {product.price.toLocaleString("es-AR")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
