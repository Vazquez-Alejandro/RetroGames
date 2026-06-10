import styles from "./FormularioProducto.module.css";

export function FormularioProducto({
  formData,
  handleChange,
  handleSubmit,
  handleImageChange,
  loading,
}) {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Agregar Nuevo Producto</h3>
      <div className={styles.field}>
        <label className={styles.label}>Nombre del Producto:</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Ej: Super Mario 64"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Precio:</label>
        <input
          className={styles.input}
          type="number"
          placeholder="Ej: 25000"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Stock:</label>
        <input
          className={styles.input}
          type="number"
          placeholder="Ej: 10"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Imagen:</label>
        <input className={styles.input} type="file" onChange={handleImageChange} />
      </div>
      <button className={styles.submitBtn} type="submit" disabled={loading}>
        {loading ? "Subiendo imagen..." : "Guardar Producto"}
      </button>
    </form>
  );
}
