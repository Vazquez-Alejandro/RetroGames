import logo from '../../assets/img/logo.png'
import { Nav } from '../Nav/Nav'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Retro Games" className={styles.logo} />
      <Nav />
    </header>
  )
}
