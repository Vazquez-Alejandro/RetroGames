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
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    { key: "juegos", label: "Juegos", img: "/images/juegos.png" },
    { key: "consolas", label: "Consolas", img: "/images/consolas.png" },
    { key: "accesorios", label: "Accesorios", img: "/images/accesorios.png" },
  ];

  const filteredProducts = products.filter(
    (p) => p.category === category
  );

  const searchedProducts = searchTerm
    ? filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  const totalPages = Math.max(1, Math.ceil(searchedProducts.length / itemsPerPage));
  const paginatedProducts = searchedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
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

  useEffect(() => {
    setPage(1);
  }, [category, searchTerm]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}>
          <span /><span /><span /><span />
          <span /><span /><span /><span />
        </div>
        <p>CARGANDO...</p>
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
      <ItemList products={paginatedProducts} />
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Página anterior"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              className={`${styles.pageBtn} ${page === n ? styles.pageBtnActive : ""}`}
              onClick={() => setPage(n)}
              aria-label={`Ir a página ${n}`}
              aria-current={page === n ? "page" : undefined}
            >
              {n}
            </button>
          ))}
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Página siguiente"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};
