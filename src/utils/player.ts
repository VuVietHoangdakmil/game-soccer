import { Player } from "../types/data/player";
import { Skill } from "@/types/data/skill";
import { skills } from "../data/skills";
import { ranDomItem } from "./random-item";

const getSkillRandom = (skills: Skill[]) => {
  const copyArr = [...skills];
  const skillsRandom = [];
  for (let i = 0; i < 5; i++) {
    const { item, index } = ranDomItem<Skill>(copyArr);
    skillsRandom.push(item);

    // xóa phần tử đã thêm
    copyArr.splice(index, 1);
  }
  return skillsRandom;
};
const player = ({
  id,
  name,
  number,
}: {
  id: string;
  name: string;
  number: number;
}): Player => ({
  id,
  name,
  number,
  skills: getSkillRandom(skills),
  defense: Math.floor(Math.random() * 5) + 1,
});

export default player;
