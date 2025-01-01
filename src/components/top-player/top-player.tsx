import { useMemo } from "react";
import { top10Type } from "@/types/data/custome-data-round";
import { useStateApp } from "../providers/state-app";
import { Player } from "@/types/data/player";
import { FaMedal } from "react-icons/fa";
const groupIdPlayer = (player: Player[]) => {
  const obj = player.reduce((acc: { [key: string]: Player }, item) => {
    acc[item.id] = item; // Gán phần tử vào object với key là id
    return acc;
  }, {});
  return obj;
};
const Top10Player: React.FC<{
  top10Player: top10Type;
  title?: string;
  srcoll?: boolean;
}> = ({ top10Player, title = "Thứ hạng cầu thủ ", srcoll }) => {
  const {
    actionPlayer: { player },
  } = useStateApp();

  const dataMemo = useMemo(() => {
    const groupId = groupIdPlayer(player);

    return top10Player.map((item) => {
      const data = groupId[item.idPlayer];
      return {
        id: item.idPlayer,
        name: data?.name,
        number: data?.number,
        score: item.score,
      };
    });
  }, [JSON.stringify(player), JSON.stringify(top10Player)]);
  return (
    <>
      {dataMemo.length > 0 && (
        <>
          <h1 className="text-blue-500 font-medium text-xl mb-5 text-center">
            {title}
          </h1>
          <div className={srcoll ? "max-h-[40vh] overflow-auto" : ""}>
            {dataMemo.map((item, index) => {
              const top = index + 1;
              return (
                <div className="text-black mb-4 flex items-start" key={item.id}>
                  <div>
                    <span className="font-medium"> Cầu thủ top {top} : </span>
                    <span className="text-blue-500 font-medium">
                      {" "}
                      {item.name}
                    </span>{" "}
                    với số áo{" "}
                    <span className="text-blue-500 font-medium">
                      {item.number}
                    </span>{" "}
                    đạt{" "}
                    <span className="text-red-500 font-medium">
                      {item.score} điểm
                    </span>
                  </div>
                  {(top === 1 || top === 2 || top === 3) && (
                    <FaMedal className="text-2xl text-blue-500 ml-2" />
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
export default Top10Player;
