"use client";

import { useState } from "react";
import { buyTicket } from "@/lib/transactions";

export default function StartButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleStartGame = async () => {
    setLoading(true);
    setMessage("");

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setMessage("Ingen JWT-token hittades. Är du inloggad via Tivoli?");
      setLoading(false);
      return;
    }

    try {
      await buyTicket(jwt);
      setMessage("Spelet startar!");
      // Här kan du t.ex. sätta gameStarted = true eller dispatcha något
    } catch (error: any) {
      setMessage(error.message || "Ett fel uppstod vid betalning.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleStartGame}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {loading ? "Bearbetar..." : "Spela"}
      </button>
      {message && <p className="text-white text-sm">{message}</p>}
    </div>
  );
}
