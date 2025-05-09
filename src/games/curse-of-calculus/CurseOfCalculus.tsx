"use client";

import React, { useEffect, useState } from "react";
import mathPairs from "@/data/mathPairs.json";
import { generateCards } from "@/games/curse-of-calculus/utils";
import { CurseCard, CursePair } from "@/games/curse-of-calculus/types";

const card_pairs = 9;

export default function CurseOfCalculus() {
  const [cards, setCards] = useState<CurseCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<CurseCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  useEffect(() => {
    const pairs = mathPairs as CursePair[];
    const newCards = generateCards(pairs, card_pairs);
    setCards(newCards);
  });
}

// To do:
// Import pairs from .json file
// Use utils function to generate random pairs
// Handle states for cards, selected, matches etc
