"use client";

import React, { useState } from "react";
import { collectPaymentFromPlayer } from "@/utils/transactions/moneyTransactions";

type Props = {
  onSuccess: (credits: number) => void;
  token: string | null;
};

export default function CreditPurchase({ onSuccess, token }: Props) {
  const [euros, setEuros] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePurchase = async () => {
    setLoading(true);
    setError("");

    const credits = euros * 5;

    const response = await collectPaymentFromPlayer(token, euros);
    if (response.success) {
      onSuccess(credits);
    } else {
      setError(response.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div>
      <label>
        How many euro would you like to exchange? (1 EUR = 5 credits):
        <input
          type="number"
          value={euros}
          min={1}
          onChange={(e) => setEuros(Number(e.target.value))}
        />
      </label>
      <button onClick={handlePurchase} disabled={loading}>
        {loading ? "Waiting..." : "Purchasing credits"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
