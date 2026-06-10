import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, getDoc, doc } from "firebase/firestore";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import styles from "./ItemDetailContainer.module.css";

export const ItemDetailContainer = () => {
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItemDetail({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Elemento no encontrado");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
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
