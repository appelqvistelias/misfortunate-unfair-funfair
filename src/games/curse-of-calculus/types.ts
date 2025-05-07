export type CursePair = {
  id: number;
  expression: string;
  solution: string;
};

export type CurseCard = {
  id: string;
  value: string;
  pairId: number;
  isRevealed: boolean;
  isMatched: boolean;
};
