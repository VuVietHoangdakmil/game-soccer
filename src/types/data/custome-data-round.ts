export type top10Type = {
  idPlayer: string;
  score: number;
}[];
export type scorePlayerType = {
  [key: string]: {
    score: number;
  };
};
export interface CustomerDataRound {
  top10CorcePlayerAllRound: top10Type;
  scoreGroupRound: {
    [key: string]: {
      scorePlayer: scorePlayerType;
      top10sorcePlayer: top10Type;
    };
  };
  skillAllRound: {
    [key: string]: {
      count: number;
    };
  };
}
