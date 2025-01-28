import { create } from "zustand";
import { GameTuple } from "../components/Game";
import { Difficulties } from "../constants";

type PlayingMode = "isPlaying" | "isInMenu" | "isInScoreboard";

interface GameState {
  gameData: GameTuple[];
  setGameData: (data: GameTuple[]) => void;
  playingMode: PlayingMode;
  setPlayingMode: (mode: PlayingMode) => void;
  time: number;
  setTime: (newTime: number) => void;
  difficulty: Difficulties;
  setDifficulty: (newDifficulty: Difficulties) => void;
}

const useGameStore = create<GameState>((set) => ({
  gameData: [],
  setGameData: (newGameData) =>
    set(() => ({
      gameData: newGameData,
    })),

  playingMode: "isInMenu",
  setPlayingMode: (mode) => set({ playingMode: mode }),
  time: 0,
  setTime: (newTime) =>
    set(() => ({
      time: newTime,
    })),

  difficulty: "Medium",
  setDifficulty: (newDifficulty) =>
    set(() => ({
      difficulty: newDifficulty,
    })),
}));

export default useGameStore;
