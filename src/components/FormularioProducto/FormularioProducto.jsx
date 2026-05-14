import styles from './FormularioProducto.module.css'

export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen, loading }) {
  return (
    <form className={styles.form} onSubmit={manejarEnvio}>
      <h3 className={styles.title}>Agregar Nuevo Producto</h3>
      <div className={styles.field}>
        <label className={styles.label}>Nombre del Producto:</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Ej: Super Mario 64"
          name="nombre"
          value={datosForm.nombre}
          onChange={manejarCambio}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Precio:</label>
        <input
          className={styles.input}
          type="number"
          placeholder="Ej: 25000"
          name="precio"
          value={datosForm.precio}
          onChange={manejarCambio}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Stock:</label>
        <input
          className={styles.input}
          type="number"
          placeholder="Ej: 10"
          name="stock"
          value={datosForm.stock}
          onChange={manejarCambio}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Imagen:</label>
        <input
          className={styles.input}
          type="file"
          onChange={manejarCambioImagen}
        />
      </div>
      <button className={styles.submitBtn} type="submit" disabled={loading}>
        {loading ? 'Subiendo imagen...' : 'Guardar Producto'}
      </button>
    </form>
  )
}
