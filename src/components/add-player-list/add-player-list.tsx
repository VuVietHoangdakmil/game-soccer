import { Button } from "antd";
import { useStateApp } from "@/components/providers/state-app";
import PlayerJson from "@/data/file.json";
import { notifySuccess } from "@/utils/notify.helper";
const AddPlayerList = () => {
  const {
    actionPlayer: { setPlayer },
  } = useStateApp();

  const handleClick = () => {
    setPlayer(PlayerJson);
    notifySuccess("Thêm cầu thủ thành công");
  };
  return (
    <Button type="primary" onClick={handleClick}>
      Chọn cầu thủ có sẵn từ danh sách
    </Button>
  );
};
export default AddPlayerList;
