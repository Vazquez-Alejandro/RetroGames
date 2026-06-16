import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Iniciar Sesión</h2>
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
          />
        </div>
        <button type="submit" className={styles.submitBtn}>Ingresar</button>
      </form>
      <p className={styles.link}>
        ¿No tenés una cuenta? <Link to="/registro">Registrate aquí</Link>
      </p>
    </div>
  );
}
