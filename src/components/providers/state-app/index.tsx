import React, { createContext, useState, useContext } from "react";
import { Player } from "@/types/data/player";
import { Playerdata } from "@/types/data/play-data";

import { dataScoreAndCountSkill } from "@/utils/customerdata";
import { CustomerDataRound } from "@/types/data/custome-data-round";
export interface RoundData {
  [key: number]: Playerdata[];
}
interface ContextType {
  actionPlayer: {
    player: Player[];
    setPlayer: React.Dispatch<React.SetStateAction<Player[]>>;
  };
  actionRound: {
    roundData: RoundData;
    setRoundData: React.Dispatch<React.SetStateAction<RoundData>>;

    setRoundCurrent: React.Dispatch<React.SetStateAction<number>>;
    roundCurrent: number;
    roundDataCustomer: CustomerDataRound;
    setRoundDataCustomer: React.Dispatch<
      React.SetStateAction<CustomerDataRound>
    >;
  };
}

const Context = createContext<ContextType | undefined>(undefined);

export const ProviderStateApp: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [player, setPlayer] = useState<Player[]>([]);
  const [roundCurrent, setRoundCurrent] = useState<number>(1);
  const [roundData, setRoundData] = useState<RoundData>({});
  const [roundDataCustomer, setRoundDataCustomer] = useState<CustomerDataRound>(
    dataScoreAndCountSkill(roundData)
  );
  console.log("player", player);
  const actionPlayer = {
    player,
    setPlayer,
  };
  const actionRound = {
    roundData,
    setRoundData,
    setRoundCurrent,
    roundCurrent,
    roundDataCustomer,
    setRoundDataCustomer,
  };
  return (
    <Context.Provider value={{ actionPlayer, actionRound }}>
      {children}
    </Context.Provider>
  );
};

export const useStateApp = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useInfo must be used within an InfoProvider");
  }
  return context;
};
