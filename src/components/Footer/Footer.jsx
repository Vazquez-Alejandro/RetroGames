import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.socialList}>
        <li className={styles.socialLink}>WhatsApp</li>
        <li className={styles.socialLink}>Instagram</li>
        <li className={styles.socialLink}>Twitter</li>
      </ul>
      <div className={styles.separator} />
      <p className={styles.copy}>&copy; 2026 Retro Games - Todos los derechos reservados</p>
    </footer>
  )
}
