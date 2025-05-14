"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.wrapper}>
        <p className={styles.logo}>Unfair Funfair</p>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <ul className={`${styles.navList} ${menuOpen ? styles.navOpen : ""}`}>
        <li>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </li>
        <li>
          <Link href="/curse-of-calculus" onClick={() => setMenuOpen(false)}>
            Curse Of Calculus
          </Link>
        </li>
        <li>
          <Link href="/madame-misfortune" onClick={() => setMenuOpen(false)}>
            Madame Misfortune
          </Link>
        </li>
      </ul>
    </nav>
  );
}
