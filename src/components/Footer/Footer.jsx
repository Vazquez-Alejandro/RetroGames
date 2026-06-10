import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./Footer.module.css";

const GITHUB_URL = "https://github.com/Vazquez-Alejandro";

export const Footer = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "equipo"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeam(items);
      } catch (err) {
        console.error("Error al cargar equipo:", err);
      }
    };
    fetchTeam();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.teamSection}>
        <h3 className={styles.teamTitle}>Nuestro Equipo</h3>
        <div className={styles.teamGrid}>
          {team.map((person) => (
            <div key={person.id} className={styles.teamCard}>
              <img
                src={person.fotoURL}
                alt={person.name}
                className={styles.teamImg}
              />
              <p className={styles.teamName}>{person.name}</p>
              <p className={styles.teamRole}>{person.role}</p>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.teamLink}>
                GitHub
              </a>
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
