"use client";

import { useEffect, useState } from "react";
import Card from "../../components/MadameMisfortune/Card";
import { TarotCard } from "../../components/MadameMisfortune/types";
import { Parisienne } from "next/font/google";
import deckData from "@/data/tarotCards.json";
import styles from "@/app/madame-misfortune/madame.module.css";
import JwtListener from "@/components/JwtListener";
import { buyTicket, awardStamp } from "@/lib/transactions";

const parisienne = Parisienne({ weight: "400", subsets: ["latin-ext"] });

export default function MadameMisfortuneGame() {
  const [selected, setSelected] = useState<number[]>([]);
  const [deck] = useState<TarotCard[]>(() =>
    [...deckData].sort(() => Math.random() - 0.5)
  );
  const [step, setStep] = useState<"intro" | "choose" | "reveal">("intro");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setStep("choose");
    } catch (err) {
      setError("Payment failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id: number): void => {
    if (selected.length >= 3 || selected.includes(id)) return;
    const newSelection = [...selected, id];
    setSelected(newSelection);

    if (newSelection.length === 3) {
      setTimeout(() => setStep("reveal"), 1000);
    }
  };

  // Award stamp when game ends
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

    if (step === "reveal") {
      giveStamp();
    }
  }, [step]);

  return (
    <>
      <JwtListener />

      <section className={styles.body}>
        <header className={styles.header}>
          <h1 style={parisienne.style}>Madame Misfortune</h1>
          {step === "intro" && (
            <p>
              {`No refunds here, no way to flee,`}
              <br />
              {`let's see what misery chose thee!`}
            </p>
          )}
          {step === "choose" && (
            <p>
              {`Prepare to learn what you'd rather not know,`}
              <br />
              {`begin by picking three cards below...`}
            </p>
          )}
          {step === "reveal" && (
            <p>
              {`Three signs of doom from hand you've played,`}
              <br />
              {`discover what wicked fate has been laid...`}
            </p>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </header>

        <main
          key={step}
          className={`${styles.cards} 
            ${step === "choose" ? styles.cardsFadeChoose : ""} 
            ${step === "reveal" ? styles.cardsFadeReveal : ""}
          `}
        >
          {step === "intro" && (
            <button
              onClick={handlePlayClick}
              disabled={loading}
              className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-xl text-xl"
            >
              {loading ? "Processing..." : "Play"}
            </button>
          )}

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
            <div className={styles.options}>
              <a href="/madame-misfortune">Play again</a>
              &nbsp; or &nbsp;
              <a href="/">Go back to start</a>
            </div>
          )}
        </main>
      </section>
    </>
  );
}
