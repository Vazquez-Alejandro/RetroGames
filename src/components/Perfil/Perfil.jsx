import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Perfil.module.css";

export function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mi Perfil</h2>
      <p className={styles.welcome}>¡Hola de nuevo, {user.email}!</p>
      <p className={styles.rol}>Rol: {user.rol}</p>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}
