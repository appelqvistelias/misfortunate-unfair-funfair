"use client";

import React, { useEffect, useState } from "react";
import styles from "@/games/curse-of-calculus/CurseOfCalculus.module.css";
import mathPairs from "@/data/mathPairs.json";
import GameBoard from "@/components/curse-of-calculus/GameBoard/GameBoard";
import Modal from "@/components/Modal/Modal";
import { generateCards } from "@/games/curse-of-calculus/utils";
import { CurseCard, CursePair } from "@/games/curse-of-calculus/types";
import JwtListener from "@/components/JwtListener/JwtListener";
import { buyTicket, awardStamp } from "@/lib/curse-of-calculus/transactions";

const CARD_PAIRS = 9;

export default function CurseOfCalculus() {
  const [step, setStep] = useState<"intro" | "playing" | "victory">("intro");
  const [loading, setLoading] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cards, setCards] = useState<CurseCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<CurseCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [lives, setLives] = useState<number>(9);

  useEffect(() => {
    if (step === "playing") {
      const pairs = mathPairs as CursePair[];
      const newCards = generateCards(pairs, CARD_PAIRS);
      setCards(newCards);
      setSelectedCards([]);
      setMatchedPairs([]);
      setLives(9);
      setError(null);
    }
  }, [step]);

  const handlePlayClick = async () => {
    setLoading(true);
    setError(null);

    const jwtToken = localStorage.getItem("jwt");
    if (!jwtToken) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      await buyTicket(jwtToken);
      setStep("playing");
    } catch (err) {
      setError("Payment failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const giveStamp = async () => {
      const jwtToken = localStorage.getItem("jwt");
      if (!jwtToken) return;

      try {
        await awardStamp(jwtToken);
        console.log("Stamp awarded!");
      } catch (err) {
        console.error("Failed to award stamp:", err);
      }
    };

    if (step === "victory") {
      giveStamp();
    }
  }, [step]);

  const handleCardClick = (card: CurseCard) => {
    if (step !== "playing") return;

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

          if (matchedPairs.length + 1 === CARD_PAIRS) {
            setShowVictory(true);
            setStep("victory");
          }
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

          setLives((prevLives) => {
            const newLives = prevLives - 1;
            if (newLives <= 0) {
              alert("Game Over! You ran out of lives.");
              setStep("intro");
              return 0;
            }
            return newLives;
          });
        }, 1000);
      }
    }
  };

  return (
    <div>
      <JwtListener />

      {step === "intro" && (
        <div className={styles.introWrapper}>
          <button
            onClick={handlePlayClick}
            disabled={loading}
            className={styles.playButton}
          >
            {loading ? "Processing..." : "Buy Ticket to Play"}
          </button>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      )}

      {step === "playing" && (
        <>
          <p>Lives: {lives}</p>
          <GameBoard cards={cards} onCardClick={handleCardClick} />
        </>
      )}

      <Modal
        isOpen={showVictory}
        onClose={() => {
          setShowVictory(false);
          setStep("intro");
        }}
        title="Congratulations!"
      >
        <p>You did pay attention during math class!</p>
        <p>Take this Platinum Pallas Cat stamp!</p>
      </Modal>
    </div>
  );
}
