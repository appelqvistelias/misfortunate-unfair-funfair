export enum TarotSuit {
    Major = "Major",
    Cups = "Cups",
    Swords = "Swords",
    Pentacles = "Pentacles",
    Wands = "Wands"
  }
  
  export interface TarotCard {
    readonly id: number;
    readonly name: string;
    readonly suit: TarotSuit;
    readonly imageUrl: string;
  }
  
  export interface ApiError {
    message: string;
    status?: number;
  }
  