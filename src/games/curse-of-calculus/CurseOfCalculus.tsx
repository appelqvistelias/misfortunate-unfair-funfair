"use client";

import React, { useEffect, useState } from "react";
import mathPairs from "@/data/mathPairs.json";
import GameBoard from "@/components/curse-of-calculus/GameBoard/GameBoard";
import VictoryMessage from "@/components/curse-of-calculus/VictoryMessage/VictoryMessage";
import { generateCards } from "@/games/curse-of-calculus/utils";
import { CurseCard, CursePair } from "@/games/curse-of-calculus/types";
import JwtListener from "@/components/JwtListener";
import { buyTicket, awardStamp } from "@/lib/curse-of-calculus/transactions";

const CARD_PAIRS = 9;

export default function CurseOfCalculus() {
  const [step, setStep] = useState<"intro" | "playing" | "victory">("intro");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cards, setCards] = useState<CurseCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<CurseCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  useEffect(() => {
    if (step === "playing") {
      const pairs = mathPairs as CursePair[];
      const newCards = generateCards(pairs, CARD_PAIRS);
      setCards(newCards);
      setSelectedCards([]);
      setMatchedPairs([]);
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
        }, 1000);
      }
    }
  };

  return (
    <div>
      <JwtListener />

      {step === "intro" && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={handlePlayClick}
            disabled={loading}
            className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-xl text-xl"
          >
            {loading ? "Processing..." : "Buy Ticket to Play"}
          </button>
          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        </div>
      )}

      {step === "playing" && (
        <GameBoard cards={cards} onCardClick={handleCardClick} />
      )}

      {step === "victory" && (
        <>
          <VictoryMessage />
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
              onClick={() => setStep("intro")}
              className="underline text-blue-600"
            >
              Play again
            </button>
          </div>
        </>
      )}
    </div>
  );
}
