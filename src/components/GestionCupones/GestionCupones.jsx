import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import styles from "./GestionCupones.module.css";

export const GestionCupones = () => {
  const [cupones, setCupones] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [porcentaje, setPorcentaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "cupones"),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCupones(items);
      },
      (err) => {
        console.error("Error al obtener cupones:", err);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!codigo.trim() || !porcentaje.trim()) {
      setError("Completá todos los campos");
      return;
    }

    const pct = Number(porcentaje);
    if (isNaN(pct) || pct <= 0 || pct > 100) {
      setError("El porcentaje debe ser un número entre 1 y 100");
      return;
    }

    try {
      await addDoc(collection(db, "cupones"), {
        codigo: codigo.trim().toUpperCase(),
        porcentaje: pct,
      });
      setCodigo("");
      setPorcentaje("");
    } catch (err) {
      setError("Error al crear el cupón: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "cupones", id));
    } catch (err) {
      console.error("Error al eliminar cupón:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gestión de Cupones</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <h3 className={styles.subtitle}>Crear nuevo cupón</h3>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.field}>
          <label className={styles.label}>Código del cupón</label>
          <input
            className={styles.input}
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ej: DESCUENTO10"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Porcentaje de descuento</label>
          <input
            className={styles.input}
            type="number"
            min="1"
            max="100"
            value={porcentaje}
            onChange={(e) => setPorcentaje(e.target.value)}
            placeholder="Ej: 15"
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          Crear cupón
        </button>
      </form>

      <section className={styles.listSection}>
        <h3 className={styles.subtitle}>Cupones existentes</h3>
        {cupones.length === 0 ? (
          <p className={styles.empty}>No hay cupones todavía</p>
        ) : (
          <ul className={styles.list}>
            {cupones.map((cupon) => (
              <li key={cupon.id} className={styles.item}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemCodigo}>{cupon.codigo}</span>
                  <span className={styles.itemPorcentaje}>{cupon.porcentaje}%</span>
                </div>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(cupon.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
