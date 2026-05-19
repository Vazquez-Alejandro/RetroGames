import { useNotify } from "../../context/NotificationContext";
import styles from "./Notification.module.css";

export function Notification() {
  const { notification, clearNotification } = useNotify();

  if (!notification) return null;

  return (
    <div className={styles.overlay} onClick={clearNotification}>
      <div className={styles.notification}>
        <div className={styles.header}>RETRO GAMES</div>
        <div className={styles.body}>
          <span className={styles.arrow}>&gt;</span> {notification}
        </div>
        <div className={styles.footer} onClick={clearNotification}>[ OK ]</div>
      </div>
    </div>
  );
}
