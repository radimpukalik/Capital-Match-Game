import { Difficulties } from "../constants";

export interface IStats {
  rightMatch: number;
  wrongMatch: number;
  citiesLeft: number;
  accuracy: number;
}

export interface IcompleteStats extends IStats {
  id: string;
  time: number;
  difficulty: Difficulties;
}
