"use client";

import { Offside } from "next/font/google";
const offside = Offside({ subsets: ["latin"], weight: "400" });

import { Josefin_Sans } from "next/font/google";
const josefin_sans = Josefin_Sans({ subsets: ["latin"], weight: "400" });

import { useState } from "react";
import styles from "@/app/curse-of-calculus/curse-of-calculus.module.css";
import Navbar from "@/components/Navbar/Navbar";
import CurseOfCalculus from "@/games/curse-of-calculus/CurseOfCalculus";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";

export default function CurseOfCalculusPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main className={styles.mainWithBackground}>
        <div className={styles.wrapper}>
          <div className={styles.introText}>
            <h1 className={`${offside.className} ${styles.title}`}>
              Curse of Calculus
            </h1>
            <div className={styles.paragraphContainer}>
              <div className={styles.upperParagraphs}>
                <p className={`${josefin_sans.className} ${styles.paragraph}`}>
                  Remember asking in Math class:
                </p>
                <p className={`${josefin_sans.className} ${styles.paragraph}`}>
                  “Why do we learn this?”
                </p>
              </div>
              <p className={`${josefin_sans.className} ${styles.paragraph}`}>
                Welcome to why.
              </p>
              <Button text="Rules" onClick={() => setIsModalOpen(true)} />

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Game Rules"
              >
                <div
                  className={`${styles.gameRules} ${josefin_sans.className}`}
                >
                  <p>Dare to enter the arena for just €5...</p>
                  <p>
                    Test your wits in a battle of memory—match arcane
                    mathematical expressions to survive.
                  </p>
                  <p>
                    Armed with 9 precious lives, you must endure the challenge
                    to uncover the legendary...
                  </p>
                  <p>✨ Platinum Pallas Cat ✨</p>
                </div>
              </Modal>
            </div>
          </div>
          <CurseOfCalculus />
        </div>
      </main>
    </>
  );
}
