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


/**
 * Three signs of doom from hand you've played—
Now hear what wicked fate's been laid...
 */

/**
 * Your fate is sealed, your doom’s in sight,
Hope you enjoyed this little fright.
No need to scream, no use to pray—
Misfortune loves to lead the way.
*/