"use client";

import { useState } from "react";
import Card from "../../components/MadameMisfortune/Card";
import { TarotCard } from "../../components/MadameMisfortune/types";
import { Parisienne } from "next/font/google";
import deckData from "@/data/tarotCards.json";
import styles from "@/app/madame-misfortune/madame.module.css";
import JwtListener from "@/components/JwtListener";
import { buyTicket } from "@/lib/transactions"; // Betalfunktion

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
      setError("Du är inte inloggad. Öppna spelet via Tivoli.");
      setLoading(false);
      return;
    }

    try {
      await buyTicket(jwtToken); // Försök ta betalt
      setStep("choose"); // Starta spelet
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Något gick fel vid betalning.";
      setError(message);
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
              className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition"
            >
              {loading ? "Bearbetar..." : "Spela"}
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
              <a href="/madame-misfortune">Spela igen</a>
              &nbsp; eller &nbsp;
              <a href="/">Tillbaka till start</a>
            </div>
          )}
        </main>
      </section>
    </>
  );
}
