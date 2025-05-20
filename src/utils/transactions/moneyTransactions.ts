import { TransactionResponse } from "./types";
import { createTransaction } from "./transactionService";
import { GAME_CONFIG } from "./config";

/**
 * Process payment from player to your account
 *
 * @param token JWT authentication token
 * @returns Transaction response
 */

export async function collectPaymentFromPlayer(
  token: string | null
): Promise<TransactionResponse> {
  return createTransaction(
    {
      amusement_id: GAME_CONFIG.AMUSEMENT_ID,
      stake_amount: GAME_CONFIG.COST,
    },
    token
  );
}

/**
 * Send cash reward from your account to the player
 *
 * @param token JWT authentication token
 * @param amount Amount to send to player (defaults to 1.0)
 * @returns Transaction response
 */

export async function sendCashRewardToPlayer(
  token: string | null,
  amount: number = 1.0
): Promise<TransactionResponse> {
  return createTransaction(
    {
      amusement_id: GAME_CONFIG.AMUSEMENT_ID,
      payout_amount: amount,
    },
    token
  );
}

/**
 * Send stamp reward to the player
 *
 * @param token JWT authentication token
 * @returns Transaction response
 */

export async function sendStampToPlayer(
  token: string | null
): Promise<TransactionResponse> {
  return createTransaction(
    {
      amusement_id: GAME_CONFIG.AMUSEMENT_ID,
      payout_amount: 0.1, // Small amount required for stamp transactions
      stamp_id: GAME_CONFIG.STAMP_ID,
    },
    token
  );
}
