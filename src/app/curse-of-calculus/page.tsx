import styles from "@/app/curse-of-calculus/curse-of-calculus.module.css";
import Navbar from "@/components/Navbar/Navbar";
import CurseOfCalculus from "@/games/curse-of-calculus/CurseOfCalculus";

export default function CurseOfCalculusPage() {
  return (
    <main>
      <Navbar />
      <h1>Curse of Calculus</h1>
      <CurseOfCalculus />
    </main>
  );
}
