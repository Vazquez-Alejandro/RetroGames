import { useState, useEffect } from "react";
import styles from "./Footer.module.css";

export const Footer = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("/data/nosotros.json")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch(() => {});
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.teamSection}>
        <h3 className={styles.teamTitle}>Nuestro Equipo</h3>
        <div className={styles.teamGrid}>
          {team.map((person) => (
            <div key={person.id} className={styles.teamCard}>
              <img
                src={person.image}
                alt={person.name}
                className={styles.teamImg}
              />
              <p className={styles.teamName}>{person.name}</p>
              <p className={styles.teamRole}>{person.role}</p>
              <p className={styles.teamEmail}>{person.email}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.separator} />
      <ul className={styles.socialList}>
        <li className={styles.socialLink}>WhatsApp</li>
        <li className={styles.socialLink}>Instagram</li>
        <li className={styles.socialLink}>Twitter</li>
      </ul>
      <p className={styles.copy}>&copy; 2026 Retro Games - Todos los derechos reservados</p>
    </footer>
  );
};
