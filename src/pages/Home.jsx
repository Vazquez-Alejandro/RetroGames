import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { ItemList } from "../components/ItemList/ItemList";
import styles from "./Home.module.css";

export function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "productos"))
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const game = data.find((p) => p.category === "juegos-atari");
        const consola = data.find((p) => p.category === "consolas");
        const accessory = data.find((p) => p.category === "accesorios");
        setFeatured([game, consola, accessory].filter(Boolean));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Helmet>
        <title>Retro Games | Tienda de productos retro</title>
        <meta name="description" content="Los mejores juegos, consolas y accesorios retro de la vieja escuela." />
      </Helmet>
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
        <ItemList products={featured} />
      )}
    </div>
  );
}
