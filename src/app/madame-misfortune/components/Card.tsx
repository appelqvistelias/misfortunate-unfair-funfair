'use client';

import styles from './card.module.css';
import { TarotCard } from '../types';

interface CardProps {
  card: TarotCard;
  isSelected: boolean;
  isFaded: boolean;
  onClick: (id: number) => void;
}

export default function Card({ card, isSelected, isFaded, onClick }: CardProps) {
  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''} ${isFaded ? styles.faded : ''}`}
      onClick={() => onClick(card.id)}
    >
        <div className={styles.back}>
            {/* <img src={card.imageUrl} alt={card.name} /> */}
        </div>
    </div>
  );
}
