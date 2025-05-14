"use client";

import styles from "./card.module.css";
import { TarotCard } from "./types";

type CardProps = {
  card: TarotCard;
  isSelected: boolean;
  isFaded?: boolean;
  isRevealed?: boolean;
  onClick?: (id: number) => void;
};

export default function Card({
  card,
  isSelected,
  isFaded = false,
  isRevealed = false,
  onClick,
}: CardProps) {
  const handleClick = () => {
    if (onClick) onClick(card.id);
  };

  return (
    <div
      className={`
            ${styles.card} 
            ${isFaded ? styles.faded : ""} 
            ${isSelected ? styles.selected : ""}
            ${isRevealed ? styles.revealed : ""}
        `}
      onClick={handleClick}
    >
      {isRevealed && (
        <>
          <h2>{card.name}</h2>
          <p>{card.text}</p>
        </>
      )}
    </div>
  );
}
