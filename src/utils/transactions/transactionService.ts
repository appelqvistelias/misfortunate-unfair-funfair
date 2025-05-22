import { TransactionPayload, TransactionResponse } from "./types";

/**
 * Creates a transaction with the backend API
 * @param payload Transaction details
 * @param token JWT authentication token
 * @returns Response with transaction result
 */

export async function createTransaction(
  payload: TransactionPayload,
  token: string | null
): Promise<TransactionResponse> {
  try {
    if (!token) {
      return {
        success: false,
        error: "No authentication token provided",
      };
    }

    console.log("Creating transaction with payload:", payload);

    const response = await fetch("https://yrgobanken.vip/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    // Get response text first (for debugging)
    const responseText = await response.text();

    // Try to parse the response as JSON
    let data;
    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch (e) {
      console.error("Failed to parse response:", responseText);
      return {
        success: false,
        error: `Invalid response format: ${responseText}`,
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error:
          data.error ||
          data.message ||
          `Transaction failed with status: ${response.status}`,
      };
    }

    return {
      success: true,
      transaction_id: data?.id || data?.transaction?.id,
      message: data?.message || "Transaction completed successfully",
    };
  } catch (error) {
    console.error("Transaction error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Transaction failed",
    };
  }
}
