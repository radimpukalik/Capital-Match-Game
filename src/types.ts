export enum Difficulty {
  Easy = 3,
  Medium = 6,
  Hard = 9,
}

export const DifficultyNames: { [key in Difficulty]: string } = {
  [Difficulty.Easy]: "Easy",
  [Difficulty.Medium]: "Medium",
  [Difficulty.Hard]: "Hard",
};

export interface IObject {
  [key: string]: string;
}

export interface CountriesByRegion {
  [region: string]: { [country: string]: string };
}

export interface IMatchStats {
  id: string;
  citiesLeft: number;
  difficulty: Difficulty;
  rightMatches: number;
  wrongMatches: number;
  accuracy: number;
  timeInS: number;
}

export interface IPlayingMode {
  isInMenu: boolean;
  isPlaying: boolean;
}

export interface IGameData {
  clickedRegions: string[];
  clickedGameRegionData: Record<string, any>;
}
