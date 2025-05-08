'use client'

import styles from '@/app/madame-misfortune/madame.module.css';
import { useEffect, useState } from 'react';
import Card from './components/Card';
import { TarotCard, ApiError, TarotSuit } from './types';
import { Parisienne } from 'next/font/google';

const parisienne = Parisienne({ weight: '400' })

export default function MadameMisfortune() {
  const [deck, setDeck] = useState<ReadonlyArray<TarotCard>>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    fetchDeck().catch(setError);
  }, []);

  const fetchDeck = async (): Promise<void> => {
    try {
      // Temporär mock-data tills API finns
      const data: TarotCard[] = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        name: `Kort ${i + 1}`,
        suit: TarotSuit.Major,
        imageUrl: `@/img/tarot/card-back.png`
      }));
      setDeck(data);
    } catch (err: unknown) {
      const apiErr: ApiError = {
        message: err instanceof Error ? err.message : 'Okänt fel',
        status: (err as ApiError)?.status
      };
      setError(apiErr);
    }
  };

  const handleSelect = (id: number): void => {
    if (selected.length >= 3 || selected.includes(id)) return;
    setSelected(prev => [...prev, id]);
  };

  return (
    <>
        <header className={styles.header}>
            <h1 style={parisienne.style}>Madame Misfortune</h1>
            <p>Prepare to learn what you’d rather not know, <br />
            begin by picking three cards below...</p>
        </header>
        <main className={styles.cards}>
        {error && <div style={{ color: 'red' }}>{error.message}</div>}
            {deck.map(card => (
            <Card
                key={card.id}
                card={card}
                isSelected={selected.includes(card.id)}
                isFaded={selected.length === 3 && !selected.includes(card.id)}
                onClick={handleSelect}
            />
        ))}
        </main>
    </>
  );
}
