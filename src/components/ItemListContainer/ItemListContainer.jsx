import { useState, useEffect } from "react";
import { ItemList } from "../ItemList/ItemList";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { FaSearch } from "react-icons/fa";
import styles from "./ItemListContainer.module.css";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("juegos");
  const [subCategory, setSubCategory] = useState("juegos-atari");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { key: "juegos", label: "Juegos", img: "/images/juegos.png" },
    { key: "consolas", label: "Consolas", img: "/images/consolas.png" },
    { key: "accesorios", label: "Accesorios", img: "/images/accesorios.png" },
  ];

  const subCategories = [
    { key: "juegos-atari", label: "Atari", img: "/images/Atari2600.png" },
    { key: "juegos-family", label: "Family Game", img: "/images/FamilyGame.png" },
    { key: "juegos-coleco", label: "ColecoVision", img: "/images/ColecoVision.png" },
  ];

  const activeCategory = category === "juegos" ? subCategory : category;

  const filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );

  const searchedProducts = searchTerm
    ? filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

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
      <div className={styles.searchBar}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Buscar productos por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
      {category === "juegos" && (
        <div className={styles.subFilterBar}>
          {subCategories.map((sub) => (
            <button
              key={sub.key}
              className={`${styles.subFilterBtn} ${subCategory === sub.key ? styles.subFilterBtnActive : ""}`}
              onClick={() => setSubCategory(sub.key)}
            >
              <img src={sub.img} alt={sub.label} className={styles.subFilterImg} />
              <span className={styles.subFilterLabel}>{sub.label}</span>
            </button>
          ))}
        </div>
      )}
      <ItemList products={searchedProducts} />
    </div>
  );
};
