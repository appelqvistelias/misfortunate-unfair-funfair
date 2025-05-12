export interface TarotCard {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly text: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
