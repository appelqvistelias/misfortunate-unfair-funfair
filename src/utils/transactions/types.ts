export type TransactionType = "payment" | "cash_reward" | "stamp_reward";

export interface TransactionPayload {
  amusement_id: number;
  stake_amount?: number; // For payments from players
  payout_amount?: number; // For payments to player
  stamp_id?: number; // For stamp rewards
}

export interface TransactionResponse {
  success: boolean;
  transaction_id?: string;
  message?: string;
  error?: string;
}
