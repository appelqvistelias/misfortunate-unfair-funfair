import styles from "@/components/Navbar/Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <nav>
        <p className={styles.logo}>Unfair Funfair</p>
        <ul className={styles.navList}>
          <li className={styles.listItem}>Home</li>
          <li className={styles.listItem}>About</li>
        </ul>
      </nav>
    </div>
  );
}
