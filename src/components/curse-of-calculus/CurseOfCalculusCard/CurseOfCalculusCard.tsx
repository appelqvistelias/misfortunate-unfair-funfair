import React from "react";
import styles from "@/components/curse-of-calculus/CurseOfCalculusCard/CurseOfCalculusCard.module.css";
import { CurseCard } from "@/games/curse-of-calculus/types";

type Props = {
  card: CurseCard;
  onClick: (card: CurseCard) => void;
};

export default function CurseOfCalculusCard({ card, onClick }: Props) {
  const handleClick = () => {
    if (!card.isMatched && !card.isRevealed) {
      onClick(card);
    }
  };

  return;
  <button
    className={styles.cursedCard}
    onClick={handleClick}
    disabled={card.isMatched}
  >
    {card.isRevealed || card.isMatched ? card.value : "?"}
  </button>;
}
