import { Skill } from "./skill";

export interface Passer {
  name: string;
  id: string;
  skills: Skill;

  result: "Thành công" | "Thất bại";
  score: number;
}
export interface Playerdata {
  round: number;
  passer: Passer;
  punishedPerson: { name: string; id: string };
  passReceiver: {
    name: string;
    id: string;
  };
}
