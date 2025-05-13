import { Offside } from "next/font/google";
const offside = Offside({ subsets: ["latin"], weight: "400" });

import { Josefin_Sans } from "next/font/google";
const josefin_sans = Josefin_Sans({ subsets: ["latin"], weight: "400" });

import styles from "@/app/curse-of-calculus/curse-of-calculus.module.css";
import Navbar from "@/components/Navbar/Navbar";
import CurseOfCalculus from "@/games/curse-of-calculus/CurseOfCalculus";

export default function CurseOfCalculusPage() {
  return (
    <>
      <Navbar />
      <main className={styles.mainWithBackground}>
        <div className={styles.wrapper}>
          <h1 className={`${offside.className} ${styles.title}`}>
            Curse of Calculus
          </h1>
          <div className={styles.paragraphContainer}>
            <p className={`${josefin_sans.className} ${styles.paragraph}`}>
              Remember asking in Math class: “Why do we learn this?”
            </p>
            <p className={`${josefin_sans.className} ${styles.paragraph}`}>
              Welcome to why.
            </p>
          </div>
          <CurseOfCalculus />
        </div>
      </main>
    </>
  );
}
