"use client";

import React, { useEffect, useState } from "react";
import mathPairs from "@/data/mathPairs.json";
import GameBoard from "@/components/curse-of-calculus/GameBoard/GameBoard";
import VictoryMessage from "@/components/curse-of-calculus/VictoryMessage/VictoryMessage";
import { generateCards } from "@/games/curse-of-calculus/utils";
import { CurseCard, CursePair } from "@/games/curse-of-calculus/types";
import CreditPurchase from "@/components/curse-of-calculus/CreditPurchase/CreditPurchase";
import {
  sendCashRewardToPlayer,
  sendStampToPlayer,
} from "@/utils/transactions/moneyTransactions";

const CARD_PAIRS = 9;

export default function CurseOfCalculus() {
  const [token, setToken] = useState<string | null>(null);
  const [initialCredits, setInitialCredits] = useState<number | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [cards, setCards] = useState<CurseCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<CurseCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  useEffect(() => {
    const pairs = mathPairs as CursePair[];
    const newCards = generateCards(pairs, CARD_PAIRS);
    setCards(newCards);
  }, []);

  const handleCardClick = (card: CurseCard) => {
    if (
      card.isMatched ||
      card.isRevealed ||
      selectedCards.length === 2 ||
      !credits
    )
      return;

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
          // WRONG: Remove one credit
          setCredits((prev) => (prev !== null ? prev - 1 : null));

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

  // Winning
  useEffect(() => {
    const allMatched = matchedPairs.length === CARD_PAIRS;
    if (allMatched && credits !== null && token) {
      const refundCredits = Math.floor(credits / 5);
      const refundAmount = refundCredits * 1.0;

      if (refundAmount > 0) {
        sendCashRewardToPlayer(token, refundAmount);
      }
      sendStampToPlayer(token);
    }
  }, [matchedPairs, credits, token]);

  if (credits === null) {
    return <CreditPurchase onSuccess={setCredits} token={token} />;
  }

  if (credits <= 0) {
    return <div>😢 You are out of credits. Try again!</div>;
  }

  return (
    <div>
      <p>Remaining Credits: {credits}</p>
      <GameBoard cards={cards} onCardClick={handleCardClick} />
      {matchedPairs.length === CARD_PAIRS && <VictoryMessage />}
    </div>
  );
}
