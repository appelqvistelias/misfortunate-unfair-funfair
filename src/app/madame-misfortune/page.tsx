import styles from "@/app/madame-misfortune/madame.module.css";
import Navbar from "@/components/Navbar/Navbar";
import MadameMisfortuneGame from "@/games/madame/MadameMisfortune";

export default function MadameMisfortune() {
  return (
    <>
      <Navbar />
      <MadameMisfortuneGame />
    </>
  );
}
