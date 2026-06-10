import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { Nav } from "../Nav/Nav";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to={"/"}>
          <img src={logo} alt="Retro Games" className={styles.logo} />
          <span className={styles.logoText}>Retro Games</span>
        </Link>
      </div>
      <Nav />
    </header>
  );
};
