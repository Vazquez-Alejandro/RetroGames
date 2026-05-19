import { useState } from "react";
import { FormularioProducto } from "../FormularioProducto/FormularioProducto";
import styles from "./FormularioContainer.module.css";

export function FormularioContainer() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!imageFile) {
      alert("Por favor, selecciona una imagen");
      return;
    }

    setLoading(true);

    try {
      console.log("Datos del formulario:", { ...formData, image: imageFile.name });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMessage({
        type: "success",
        text: "Producto recibido correctamente (modo demostración)",
      });

      setFormData({ name: "", price: "", stock: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Hubo un error al procesar el producto" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.sectionTitle}>Agregar Producto</h2>
      {message && (
        <div
          className={
            message.type === "success" ? styles.successMsg : styles.errorMsg
          }
        >
          {message.text}
        </div>
      )}
      <FormularioProducto
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        loading={loading}
      />
    </div>
  );
}
