export interface CreateTransactionResponse {
  success: boolean;
  message?: string;
}

interface CreateTransactionInput {
  seller: string; // Ex: Group ID for our attractions
  buyer: string; // UUID for users
  amount: number; // Money to be transfered
  stamp?: string; // Our stamp, but optional
}

export async function createTransaction(
  input: CreateTransactionInput,
  apiBaseUrl: string = "https://centralbank.example.com" // Change to correct domain once back-end group is done
): Promise<CreateTransactionResponse> {
  try {
    const response = await fetch(`${apiBaseUrl}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Potentially a auth-header here:
        // Authorization: `Bearer ${yourToken}`,
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      return {
        success: false,
        message: `Server error: ${response.statusText}`,
      };
    }

    return {
      success: true,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
