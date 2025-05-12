"use client";

import React, { useEffect, useState } from "react";
import mathPairs from "@/data/mathPairs.json";
import { generateCards } from "@/games/curse-of-calculus/utils";
import { CurseCard, CursePair } from "@/games/curse-of-calculus/types";

const card_pairs = 9;

export default function CurseOfCalculus() {
  const [cards, setCards] = useState<CurseCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<CurseCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  useEffect(() => {
    const pairs = mathPairs as CursePair[];
    const newCards = generateCards(pairs, card_pairs);
    setCards(newCards);
  }, []);

  const handleCardClick = (card: CurseCard) => {
    if (card.isMatched || card.isRevealed || selectedCards.length === 2) return;

    const revealedCard = { ...card, isRevealed: true };
    const updatedCards = cards.map((c) =>
      c.id === card.id ? revealedCard : c
    );
    setCards(updatedCards);
    const newSelected = [...selectedCards, revealedCard];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (first.pairId === second.pairId && first.id !== second.id) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true } : c
            )
          );
          setMatchedPairs((prev) => [...prev, first.pairId]);
          setSelectedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isRevealed: false }
                : c
            )
          );
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div>
      {cards.map((card) => (
        <button
          key={card.id}
          onClick={() => handleCardClick(card)}
          disabled={card.isMatched}
          className={`p-4 text-lg rounded border transition ${
            card.isMatched
              ? "bg-green-200 cursor-default"
              : card.isRevealed
              ? "bg-white border-gray-400"
              : "bg-gray-200 hover:bg-gray-300"
          }`} // Temporary tailwind styling, will be changed
        >
          {card.isRevealed || card.isMatched ? card.value : "?"}
        </button>
      ))}
      {matchedPairs.length === card_pairs && <div>🎉 You made it!</div>}
    </div>
  );
}
