import { RoundData } from "@/components/providers/state-app";
import {
  CustomerDataRound,
  scorePlayerType,
  top10Type,
} from "@/types/data/custome-data-round";
import { Playerdata } from "@/types/data/play-data";

const getTop3Score = (data: scorePlayerType): top10Type => {
  // const top: top3Type = {
  //   top1: { idPlayer: "", score: -Infinity },
  //   top2: { idPlayer: "", score: -Infinity },
  //   top3: { idPlayer: "", score: -Infinity },
  // };

  // Object.entries(data).forEach(([key, item]) => {
  //   const { top1, top2, top3 } = top;
  //   const score = item.score;

  //   if (score > top1.score) {
  //     top["top1"] = { ...top2 };
  //     top["top2"] = { ...top1 };
  //     top["top1"] = { idPlayer: key, score };
  //   } else if (score > top2.score && score < top1.score) {
  //     top["top3"] = { ...top2 };

  //     top["top2"] = { idPlayer: key, score };
  //   } else if (score > top3.score && score < top2.score) {
  //     top["top3"] = { idPlayer: key, score };
  //   }
  // });
  const dataSort = Object.entries(data)
    .sort((a, b) => b[1].score - a[1].score)
    .map((item) => ({ idPlayer: item[0], score: item[1].score }));

  return dataSort;
};
export const dataScoreAndCountSkill = (data: RoundData): CustomerDataRound => {
  const scoreGroupRound: {
    [key: string]: {
      scorePlayer: scorePlayerType;
      top10sorcePlayer: top10Type;
    };
  } = {};
  const objSkillAllRound: {
    [key: string]: { count: number };
  } = {};
  const scoreAllround: scorePlayerType = {};

  Object.entries(data).forEach(([key, value]) => {
    const objScore: scorePlayerType = {};

    const playerData: Playerdata[] = value;

    playerData.forEach((player) => {
      const score = player.passer.score;
      // tổng của diểm của từng round
      objScore[player.passer.id] = objScore[player.passer.id] || { score: 0 };
      objScore[player.passer.id].score += score;

      // tổng diểm tất cả các round
      scoreAllround[player.passer.id] = scoreAllround[player.passer.id] || {
        score: 0,
      };
      scoreAllround[player.passer.id].score += score;

      // tổng số lần sử dụng skill tất cả các round
      const skillName = player.passer.skills.name;
      objSkillAllRound[skillName] = objSkillAllRound[skillName]
        ? { count: objSkillAllRound[skillName].count + 1 }
        : { count: 1 };
    });

    scoreGroupRound[key] = {
      scorePlayer: objScore,
      top10sorcePlayer: getTop3Score(objScore),
    };
  });

  return {
    top10CorcePlayerAllRound: getTop3Score(scoreAllround),
    scoreGroupRound: scoreGroupRound,
    skillAllRound: objSkillAllRound,
  };
};
