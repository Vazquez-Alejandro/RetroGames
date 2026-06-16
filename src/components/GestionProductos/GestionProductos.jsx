import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import styles from "./GestionProductos.module.css";

const initialForm = {
  name: "",
  category: "juegos",
  description: "",
  price: "",
  stock: "",
  image: "",
};

const categories = [
  { key: "juegos", label: "Juegos" },
  { key: "consolas", label: "Consolas" },
  { key: "accesorios", label: "Accesorios" },
];

export const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "productos"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(items);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (productoAEditar) {
      setForm({
        name: productoAEditar.name || "",
        category: productoAEditar.category || "juegos",
        description: productoAEditar.description || "",
        price: String(productoAEditar.price ?? ""),
        stock: String(productoAEditar.stock ?? ""),
        image: productoAEditar.image || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [productoAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      alert("El campo nombre no puede estar vacío");
      return;
    }

    const price = Number(form.price);
    if (isNaN(price) || price <= 0) {
      alert("El precio debe ser un número mayor que cero");
      return;
    }

    const stock = Number(form.stock);
    if (isNaN(stock) || stock < 0) {
      alert("El stock debe ser un número válido");
      return;
    }

    const productData = {
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      price,
      stock,
      image: form.image.trim() || "/images/default.png",
    };

    try {
      if (productoAEditar) {
        await updateDoc(doc(db, "productos", productoAEditar.id), productData);
        alert("Producto actualizado con éxito");
        setProductoAEditar(null);
      } else {
        await addDoc(collection(db, "productos"), productData);
        alert("Producto guardado con éxito");
      }
      setForm(initialForm);
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const handleEditClick = (producto) => {
    setProductoAEditar(producto);
  };

  const cancelarEdicion = () => {
    setProductoAEditar(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      await deleteDoc(doc(db, "productos", id));
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gestión de Productos</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <h3 className={styles.subtitle}>
          {productoAEditar ? "Editar producto" : "Agregar nuevo producto"}
        </h3>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.field}>
          <label className={styles.label}>Nombre</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ej: Super Mario 64"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Categoría</label>
          <select
            className={styles.input}
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Descripción</label>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción del producto"
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Precio ($)</label>
            <input
              className={styles.input}
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Ej: 25000"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Stock</label>
            <input
              className={styles.input}
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Ej: 10"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>URL de imagen</label>
          <input
            className={styles.input}
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="/images/producto.png"
          />
        </div>

        {productoAEditar && form.image && (
          <div className={styles.preview}>
            <p className={styles.previewLabel}>Imagen actual:</p>
            <img src={form.image} alt="preview" className={styles.previewImg} />
          </div>
        )}

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn}>
            <FaSave style={{ marginRight: "5px" }} />
            {productoAEditar ? "Actualizar producto" : "Guardar producto"}
          </button>
          {productoAEditar && (
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={cancelarEdicion}
            >
              <FaTimes style={{ marginRight: "5px" }} />
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      <section className={styles.listSection}>
        <h3 className={styles.subtitle}>Productos existentes</h3>
        {productos.length === 0 ? (
          <p className={styles.empty}>No hay productos todavía</p>
        ) : (
          <ul className={styles.list}>
            {productos.map((producto) => (
              <li key={producto.id} className={styles.item}>
                <img
                  src={producto.image}
                  alt={producto.name}
                  className={styles.itemImg}
                />
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{producto.name}</span>
                  <span className={styles.itemCat}>{producto.category}</span>
                  <span className={styles.itemPrice}>
                    ${producto.price?.toLocaleString("es-AR")}
                  </span>
                  <span className={styles.itemStock}>
                    Stock: {producto.stock}
                  </span>
                </div>
                <div className={styles.itemActions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEditClick(producto)}
                  >
                    <FaEdit style={{ marginRight: "4px" }} />
                    Editar
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(producto.id)}
                  >
                    <FaTrash style={{ marginRight: "4px" }} />
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
