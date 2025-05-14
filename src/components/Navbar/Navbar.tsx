import styles from "@/components/Navbar/Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div className={styles.wrapper}>
        <p className={styles.logo}>Unfair Funfair</p>
        <ul className={styles.navList}>
          <li className={styles.listItem}>
            <Link className={styles.link} href="/">
              Home
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.link} href="/about">
              About
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.link} href="/curse-of-calculus">
              Curse Of Calculus
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.link} href="/madame-misfortune">
              Madame Misfortune
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
