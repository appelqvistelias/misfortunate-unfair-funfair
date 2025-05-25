"use client";

import { Josefin_Sans } from "next/font/google";
const josefin_sans = Josefin_Sans({ subsets: ["latin"], weight: "400" });

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/games/curse-of-calculus/CurseOfCalculus.module.css";
import JwtListener from "@/components/JwtListener/JwtListener";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import GameBoard from "@/components/curse-of-calculus/GameBoard/GameBoard";
import mathPairs from "@/data/mathPairs.json";
import { generateCards } from "@/games/curse-of-calculus/utils";
import { CurseCard, CursePair } from "@/games/curse-of-calculus/types";
import { buyTicket, awardStamp } from "@/lib/curse-of-calculus/transactions";
import { GAME_CONFIG } from "@/config/curse-of-calculus/game";

const CARD_PAIRS = 9;

export default function CurseOfCalculus() {
  const [step, setStep] = useState<"intro" | "playing" | "victory">("intro");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<CurseCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<CurseCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [lives, setLives] = useState<number>(9);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const setErrorWithModal = (msg: string) => {
    setError(msg);
    setShowError(true);
  };

  useEffect(() => {
    if (step === "playing") {
      const pairs = mathPairs as CursePair[];
      const newCards = generateCards(pairs, CARD_PAIRS);
      setCards(newCards);
      setSelectedCards([]);
      setMatchedPairs([]);
      setLives(9);
      setError(null);
      setShowError(false);
    }
  }, [step]);

  const handlePlayClick = async () => {
    setLoading(true);
    setError(null);
    setShowError(false);

    const jwtToken = localStorage.getItem("jwt");
    if (!jwtToken) {
      setErrorWithModal("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      await buyTicket(jwtToken);
      setStep("playing");
    } catch (err) {
      setErrorWithModal("Payment failed.");
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
              setShowGameOver(true);
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
        <div className={styles.buttons}>
          <Button
            onClick={() => setShowRules(true)}
            text="Rules"
            style={{
              backgroundColor: "#780000",
              borderColor: "#bc2222",
              fontFamily: josefin_sans.style.fontFamily,
            }}
          />
          <Button
            onClick={handlePlayClick}
            disabled={loading}
            text={
              loading
                ? "Processing..."
                : `Test your skills for €${GAME_CONFIG.COST}`
            }
            style={{
              backgroundColor: "#780000",
              borderColor: "#bc2222",
              fontFamily: josefin_sans.style.fontFamily,
            }}
          />
        </div>
      )}

      {step === "playing" && (
        <>
          <p className={styles.lives}>Lives: {lives}</p>
          <GameBoard cards={cards} onCardClick={handleCardClick} />
        </>
      )}

      {/* Rules Modal */}
      <Modal
        isOpen={showRules}
        onClose={() => setShowRules(false)}
        title="Game Rules"
      >
        <div className={styles.gameRules}>
          <p>{`Dare to enter the arena for just €${GAME_CONFIG.COST}`}</p>
          <p>
            Test your wits in a battle of memory—match arcane mathematical
            expressions to survive.
          </p>
          <p>
            Armed with 9 precious lives, you must endure the challenge to
            uncover the legendary...
          </p>
          <p>✨ Platinum Pallas Cat ✨</p>
        </div>
      </Modal>

      {/* Victory Modal */}
      <Modal
        isOpen={showVictory}
        onClose={() => {
          setShowVictory(false);
          setStep("intro");
        }}
        title="Well done!"
      >
        <div className={styles.victoryModal}>
          <p>Nice job paying attention in math class!</p>
          <p>Take this Platinum Pallas Cat stamp as a reward!</p>
          <p>You definitely earned it!</p>
          <div className={styles.stampImage}>
            <Image
              src="/img/curse-of-calculus/platinum-pallas-cat-stamp.svg"
              alt="Platinum Pallas Cat Stamp"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      </Modal>

      {/* Game Over Modal */}
      <Modal
        isOpen={showGameOver}
        onClose={() => {
          setShowGameOver(false);
          setStep("intro");
          setLives(9);
        }}
        title="Game Over"
      >
        <div className={styles.gameOverModal}>
          <p>Sorry, you ran out of lives!</p>
          <p>Try again?</p>
        </div>
      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={showError}
        onClose={() => {
          setShowError(false);
          setError(null);
        }}
        title="⚠️ Error ⚠️"
      >
        <div className={styles.errorModal}>
          <p>{error}</p>
        </div>
      </Modal>
    </div>
  );
}
