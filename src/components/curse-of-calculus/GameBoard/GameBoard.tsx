import React from "react";
import styles from "@/components/curse-of-calculus/GameBoard/GameBoard.module.css";
import { CurseCard } from "@/games/curse-of-calculus/types";
import CurseOfCalculusCard from "@/components/curse-of-calculus/CurseOfCalculusCard/CurseOfCalculusCard";

type Props = {
  cards: CurseCard[];
  onCardClick: (card: CurseCard) => void;
};

export default function GameBoard({ cards, onCardClick }: Props) {
  return (
    <div className={styles.gridContainer}>
      {cards.map((card) => (
        <CurseOfCalculusCard key={card.id} card={card} onClick={onCardClick} />
      ))}
    </div>
  );
}
