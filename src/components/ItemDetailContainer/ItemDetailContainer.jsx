import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import styles from "./ItemDetailContainer.module.css";

export const ItemDetailContainer = () => {
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const item = data.find((element) => String(element.id) === id);
        if (item) {
          setItemDetail(item);
          return;
        }
        throw new Error("Elemento no encontrado");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!itemDetail) return <p>Producto no encontrado</p>;

  return (
    <section className={styles.container}>
      <Link to="/productos" className={styles.backLink}>
        &larr; Volver a productos
      </Link>
      <h1>Detalles del producto</h1>
      <div className={styles.detailWrapper}>
        <ItemDetail item={itemDetail} />
      </div>
    </section>
  );
};
