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
import PopUp from "@/components/PopUp/PopUp";

export default function CurseOfCalculusPage() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

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
              <Button text="Rules" onClick={() => setIsPopUpOpen(true)} />

              <PopUp
                isOpen={isPopUpOpen}
                onClose={() => setIsPopUpOpen(false)}
                title="Game Rules"
              >
                <p className={josefin_sans.className}>
                  Here are the rules of the game...
                </p>
              </PopUp>
            </div>
          </div>
          <CurseOfCalculus />
        </div>
      </main>
    </>
  );
}
