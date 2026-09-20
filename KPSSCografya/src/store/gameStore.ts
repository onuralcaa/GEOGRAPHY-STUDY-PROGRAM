import { useState, useEffect, useRef } from 'react';

export interface GameState {
  playerName: string;
  level: number;
  xp: number;
  xpToNext: number;
  coins: number;
  lives: number;
  maxLives: number;
  unlockedCategories: string[];
  scores: Record<string, number>;
}

const DEFAULT_STATE: GameState = {
  playerName: 'Oyuncu',
  level: 1,
  xp: 0,
  xpToNext: 1000,
  coins: 0,
  lives: 5,
  maxLives: 5,
  unlockedCategories: ['sehirler'],
  scores: {},
};

// Simple in-memory store (can be replaced with AsyncStorage later)
let globalState: GameState = { ...DEFAULT_STATE };
const listeners: Array<() => void> = [];

export const gameStore = {
  getState: () => globalState,
  setState: (updater: (prev: GameState) => GameState) => {
    globalState = updater(globalState);
    listeners.forEach(l => l());
  },
  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => {
      const idx = listeners.indexOf(listener);
      if (idx > -1) listeners.splice(idx, 1);
    };
  },

  unlockCategory: (categoryId: string) => {
    gameStore.setState(prev => ({
      ...prev,
      unlockedCategories: prev.unlockedCategories.includes(categoryId)
        ? prev.unlockedCategories
        : [...prev.unlockedCategories, categoryId],
    }));
  },

  addScore: (categoryId: string, score: number) => {
    gameStore.setState(prev => {
      const oldScore = prev.scores[categoryId] ?? 0;
      const newScore = Math.max(oldScore, score);
      const xpGain = score * 10;
      const newXp = prev.xp + xpGain;
      const newCoins = prev.coins + Math.floor(score / 2);
      let newLevel = prev.level;
      let xpLeft = newXp;
      while (xpLeft >= prev.xpToNext) {
        xpLeft -= prev.xpToNext;
        newLevel += 1;
      }
      return {
        ...prev,
        scores: { ...prev.scores, [categoryId]: newScore },
        xp: xpLeft,
        level: newLevel,
        coins: newCoins,
      };
    });
  },

  loseLife: () => {
    gameStore.setState(prev => ({
      ...prev,
      lives: Math.max(0, prev.lives - 1),
    }));
  },
};

export function useGameStore(): GameState {
  const [, forceRender] = useState(0);
  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    unsubRef.current = gameStore.subscribe(() => forceRender(n => n + 1));
    return () => unsubRef.current?.();
  }, []);

  return gameStore.getState();
}
