"use client";

import { useState } from "react";
import { buyTicket } from "@/lib/buyTicket";
import { useRouter } from "next/navigation";

export default function LobbyForm() {
  const [playerName, setPlayerName] = useState("");
  const [ticketBought, setTicketBought] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleBuy = async () => {
    setError("");

    if (!playerName.trim()) {
      setError("Enter a name first.");
      return;
    }

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setError("JWT missing. Are you logged in?");
      return;
    }

    try {
      await buyTicket(jwt);
      setTicketBought(true);
    } catch (err: any) {
      setError(err.message || "Could not buy ticket.");
    }
  };

  const handleStart = () => {
    if (ticketBought) {
      router.push("/game"); // ändra till din start-sida
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg text-white space-y-4 max-w-md mx-auto">
      <input
        className="w-full p-2 text-black"
        placeholder="Your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <button
        className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded"
        onClick={handleBuy}
        disabled={ticketBought}
      >
        {ticketBought ? "Ticket Bought ✅" : "Buy Ticket"}
      </button>

      <button
        className={`w-full p-2 rounded ${
          ticketBought
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-500 cursor-not-allowed"
        }`}
        onClick={handleStart}
        disabled={!ticketBought}
      >
        Start Game
      </button>

      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}
