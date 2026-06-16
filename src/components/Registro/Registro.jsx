import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Registro.module.css";

export function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        const quiereLoguearse = window.confirm(
          "Este correo ya está registrado. ¿Desea iniciar sesión?"
        );
        if (quiereLoguearse) {
          navigate("/login");
        } else {
          navigate("/");
        }
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crear una nueva cuenta</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.field}>
          <label className={styles.label}>Correo electrónico</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Contraseña</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        <button type="submit" className={styles.submitBtn}>Registrarse</button>
      </form>
      <p className={styles.link}>
        ¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </div>
  );
}
