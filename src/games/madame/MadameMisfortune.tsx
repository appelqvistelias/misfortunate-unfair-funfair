"use client";

import styles from "@/app/madame-misfortune/madame.module.css";
import { useState } from "react";
import Card from "../../components/MadameMisfortune/Card";
import { TarotCard } from "../../components/MadameMisfortune/types";
import { Parisienne } from "next/font/google";
import deckData from "@/data/tarotCards.json";

const parisienne = Parisienne({ weight: "400" });

export default function MadameMisfortuneGame() {
  const [selected, setSelected] = useState<number[]>([]);
  const deck: ReadonlyArray<TarotCard> = deckData;
  const [step, setStep] = useState<"choose" | "reveal">("choose");

  const handleSelect = (id: number): void => {
    if (selected.length >= 3 || selected.includes(id)) return;
    const newSelection = [...selected, id];
    setSelected(newSelection);

    if (newSelection.length === 3) {
      setTimeout(() => setStep("reveal"), 1000);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <h1 style={parisienne.style}>Madame Misfortune</h1>
        {step === "choose" && (
          <p>
            Prepare to learn what you’d rather not know, <br /> begin by picking
            three cards below...
          </p>
        )}
        {step === "reveal" && (
          <p>
            Three signs of doom from hand you've played, <br /> discover what
            wicked fate's been laid...
          </p>
        )}
      </header>

      <main className={styles.cards}>
        {step === "choose" &&
          deck.map((card) => (
            <Card
              key={card.id}
              card={card}
              isSelected={selected.includes(card.id)}
              isFaded={selected.length === 3 && !selected.includes(card.id)}
              onClick={handleSelect}
            />
          ))}

        {step === "reveal" &&
          selected.map((id) => {
            const card = deck.find((c) => c.id === id);
            if (!card) return null;
            return (
              <Card
                key={card.id}
                card={card}
                isSelected={false}
                isRevealed={true}
              />
            );
          })}

        {step === "reveal" && (
          <p>
            Your fate's been sealed, no need to scream, <br />
            nor to pray – misfortune loves to lead the way.
          </p>
        )}
      </main>
    </>
  );
}
