import { Button } from "antd";
import { RoundData, useStateApp } from "@/components/providers/state-app";
import { notifyError, notifySuccess } from "@/utils/notify.helper";
import { Player } from "@/types/data/player";
import { Passer, Playerdata } from "@/types/data/play-data";
import { ranDomItem } from "@/utils/random-item";
import { useEffect, useState } from "react";
import { Skill } from "@/types/data/skill";
import { checkPassing } from "@/utils/checkPassing";
import { dataScoreAndCountSkill } from "@/utils/customerdata";
const scoringFormula = (sttPunished: number, scoreSkill: number) => {
  return 10 - sttPunished + scoreSkill;
};
const passer = (player: Player, sttPunished: number): Passer => {
  const { name, id, skills, defense } = player;
  const { item: skillRandom } = ranDomItem<Skill>(skills);
  const ischeckPassing = checkPassing(skillRandom.score, defense);

  const newScore = ischeckPassing
    ? scoringFormula(sttPunished, skillRandom.score)
    : 0;
  return {
    name,
    id,
    skills: skillRandom,

    result: ischeckPassing ? "Thành công" : "Thất bại",
    score: newScore,
  };
};

const Play = () => {
  const {
    actionPlayer: { player },
    actionRound: {
      setRoundData,
      roundCurrent,
      setRoundCurrent,
      setRoundDataCustomer,
    },
  } = useStateApp();

  const [playerPunishedRound, setplayerPunishedRound] = useState<Player[]>([]);
  const [playerNotPunishedRound, setplayerNotPunishedRound] =
    useState<Player[]>(player);

  useEffect(() => {
    setplayerNotPunishedRound(player);
  }, [player.length]);

  const handerPlay = () => {
    if (roundCurrent > 10) {
      notifyError("Đã đủ số lượt chơi");
      return;
    }
    if (player.length === 10) {
      const { item: randomPlayFined, index } = ranDomItem<Player>(
        playerNotPunishedRound
      );

      const newPlayerNotPunishedRound = [...playerNotPunishedRound];
      newPlayerNotPunishedRound.splice(index, 1);

      setRoundCurrent(roundCurrent + 1);
      setplayerNotPunishedRound(newPlayerNotPunishedRound);
      setplayerPunishedRound([...playerPunishedRound, randomPlayFined]);

      setRoundData((stateRoundData) => {
        const IdPlayerFinedsChildList: string[] = [randomPlayFined?.id]; // kiem tra vt bi phat de tru diem
        let IdPlayerFinedsChildCurrent: string = randomPlayFined?.id;
        let playPasser: Player;
        let newState: RoundData = JSON.parse(JSON.stringify(stateRoundData));
        let index = 0;

        while (
          player.filter((item) => !IdPlayerFinedsChildList.includes(item.id))
            .length > 1
        ) {
          if (index > 0) {
            const data = newState?.[roundCurrent]?.[index - 1];

            if (data?.passer?.result === "Thất bại") {
              const idPasser = data.passer.id;
              // cầu thủ chuyền thất bại ở round trước sẽ bị phạt
              if (!IdPlayerFinedsChildList.includes(idPasser)) {
                IdPlayerFinedsChildList.push(idPasser); // xác định vị trí bị phạt để tính điểm
              }
              IdPlayerFinedsChildCurrent = idPasser;

              // cầu thủ bị phạt ở round trước sẽ đc chuyền
              playPasser = player.find(
                (player) => player.id === data.punishedPerson.id
              )!;
            } else {
              // người được chuyen sẽ là người nhận  banh ở round trc
              playPasser = player.find(
                (player) => player.id === data.passReceiver.id
              )!;
            }
          }
          const playerNotFined = player.filter(
            (item) => IdPlayerFinedsChildCurrent !== item.id
          );

          if (index <= 0) {
            // mới đầu thì chọn ngẫu nhiên cầu thủ chuyền
            const { item } = ranDomItem<Player>(playerNotFined);
            playPasser = item;
          }

          // lấy  ngẫu nhiên câu thù nhận banh
          const { item: passReceiver } = ranDomItem<Player>(
            playerNotFined.filter((item) => item.id !== playPasser.id)
          );

          const indexFinedsOfPasser = IdPlayerFinedsChildList.findIndex(
            (item) => item === playPasser?.id
          ); // lay vi tri bi phat cua cau thu nay

          const passerData = passer(
            playPasser!,
            indexFinedsOfPasser === -1 ? 0 : indexFinedsOfPasser + 1
          );
          const punishedPerson = player.find(
            (item) => item.id === IdPlayerFinedsChildCurrent
          );
          const playerdata: Playerdata = {
            round: roundCurrent,
            passReceiver: { id: passReceiver.id, name: passReceiver.name },
            passer: passerData,
            punishedPerson: {
              id: punishedPerson?.id ?? "",
              name: punishedPerson?.name ?? "",
            },
          };

          if (Array.isArray(newState[roundCurrent])) {
            newState[roundCurrent].push(playerdata);
          } else {
            newState[roundCurrent] = [playerdata];
          }

          index = index + 1;
        }
        setRoundDataCustomer(dataScoreAndCountSkill(newState));
        return newState;
      });
      notifySuccess("Kết thúc vòng " + roundCurrent);
    } else {
      notifyError("Vui lòng chọn đủ 10 cầu thủ để bắt đầu lượt chơi");
    }
  };

  const handerResetRound = () => {
    setRoundData({});
    setRoundCurrent(1);
    setplayerPunishedRound([]);
    setplayerNotPunishedRound(player);
    setRoundDataCustomer(dataScoreAndCountSkill({}));
  };

  return (
    <Button
      onClick={() => {
        roundCurrent > 10 ? handerResetRound() : handerPlay();
      }}
    >
      {roundCurrent > 10 ? "Bắt đầu lại trò chơi" : "Chơi"}
    </Button>
  );
};
export default Play;
