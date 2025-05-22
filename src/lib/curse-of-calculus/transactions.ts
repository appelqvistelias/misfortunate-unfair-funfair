import { GAME_CONFIG } from "@/config/curse-of-calculus/game";

async function postTransaction(
  jwt: string,
  payload: Record<string, unknown>
): Promise<void> {
  const res = await fetch("/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Something went wrong. Payment failed :(");
  }
}

export async function buyTicket(jwt: string): Promise<void> {
  return postTransaction(jwt, {
    amusement_id: GAME_CONFIG.AMUSEMENT_ID,
    stake_amount: GAME_CONFIG.COST,
  });
}

export async function awardStamp(jwt: string): Promise<void> {
  return postTransaction(jwt, {
    amusement_id: GAME_CONFIG.AMUSEMENT_ID,
    stamp_id: GAME_CONFIG.STAMP_ID,
  });
}
