import styles from "@/components/Navbar/Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <nav>
        <p className={styles.logo}>Unfair Funfair</p>
        <ul className={styles.navList}>
          <li className={styles.listItem}>
            <a href="/">Home</a>
          </li>
          <li className={styles.listItem}>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
