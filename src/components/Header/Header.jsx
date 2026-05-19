import { Link } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to={"/"}>
          <span className={styles.logoText}>Retro Games</span>
        </Link>
      </div>
      <Nav />
    </header>
  );
};
