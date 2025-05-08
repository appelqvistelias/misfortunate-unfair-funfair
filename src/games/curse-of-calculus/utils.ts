import { CursePair, CurseCard } from "@/games/curse-of-calculus/types";

export function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export function generateCards(pairs: CursePair[], amount: number): CurseCard[] {
  const selected = shuffle(pairs).slice(0, amount);
  const cards: CurseCard[] = selected.flatMap((pair) => [
    {
      id: `${pair.id}-expr`,
      value: pair.expression,
      pairId: pair.id,
      isRevealed: false,
      isMatched: false,
    },
    {
      id: `${pair.id}-sol`,
      value: pair.solution,
      pairId: pair.id,
      isRevealed: false,
      isMatched: false,
    },
  ]);
  return shuffle(cards);
}
