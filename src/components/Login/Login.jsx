import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotify } from "../../context/NotificationContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import styles from "./Login.module.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { notify } = useNotify();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCred = await login(email, password);
      const userDocRef = doc(db, "usuarios", userCred.user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const rol = userDocSnap.exists() && userDocSnap.data().rol === "admin" ? "admin" : "user";
      notify(`¡Bienvenido ${email}!`);
      navigate(rol === "admin" ? "/admin/productos" : "/");
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
