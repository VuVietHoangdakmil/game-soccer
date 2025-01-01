import { Skill } from "./skill";

export interface Player {
  id: string;
  name: string;
  number: number;
  skills: Skill[];
  defense: number;
}
