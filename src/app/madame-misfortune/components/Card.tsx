'use client';

import styles from './card.module.css';
import { TarotCard } from '../types';

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
    onClick
  }: CardProps) {
    const handleClick = () => {
      if (onClick) onClick(card.id);
    };
  
    return (
      <div
        className={`
            ${styles.card} 
            ${isFaded ? styles.faded : ''} 
            ${isSelected ? styles.selected : ''}
            ${isRevealed ? styles.revealed : ''}
        `}
        onClick={handleClick}
      >
        {isRevealed && (
          <>
            <img
                src={isRevealed ? card.imageUrl : '/images/tarot/card-back.png'}
                alt={card.name}
                className={styles.cardImage}
            />
            <h3>{card.name}</h3>
            <p>{card.text}</p>
          </>
        )}
      </div>
    );
  }
  