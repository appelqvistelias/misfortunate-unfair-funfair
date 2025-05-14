"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className={styles.navbar}>
        <Link className={styles.logo} href="/" aria-label="Go to home page">
          Unfair Funfair
        </Link>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.navList} ${menuOpen ? styles.navOpen : ""}`}>
          <li>
            <Link
              href="/"
              aria-label="Go to home page"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              aria-label="Go to about page"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/curse-of-calculus"
              aria-label="Go to Curse of Calculus game page"
              onClick={() => setMenuOpen(false)}
            >
              Curse Of Calculus
            </Link>
          </li>
          <li>
            <Link
              href="/madame-misfortune"
              aria-label="Go to Madame Misfortune game page"
              onClick={() => setMenuOpen(false)}
            >
              Madame Misfortune
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
