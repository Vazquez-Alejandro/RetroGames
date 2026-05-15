import { useState, useEffect } from 'react'
import styles from './Footer.module.css'

export const Footer = () => {
  const [equipo, setEquipo] = useState([])

  useEffect(() => {
    fetch('/data/nosotros.json')
      .then(res => res.json())
      .then(data => setEquipo(data))
      .catch(() => {})
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.teamSection}>
        <h3 className={styles.teamTitle}>Nuestro Equipo</h3>
        <div className={styles.teamGrid}>
          {equipo.map(persona => (
            <div key={persona.id} className={styles.teamCard}>
              <img src={persona.imagen} alt={persona.nombre} className={styles.teamImg} />
              <p className={styles.teamName}>{persona.nombre}</p>
              <p className={styles.teamRole}>{persona.puesto}</p>
              <p className={styles.teamEmail}>{persona.email}</p>
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
  )
}
