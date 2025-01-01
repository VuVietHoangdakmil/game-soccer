import { useStateApp } from "@/components/providers/state-app";
import { List, Tag } from "antd";
import { useMemo } from "react";
import Container from "../container";
const ListPlayer = () => {
  const {
    actionPlayer: { player },
  } = useStateApp();

  const listMemo = useMemo(() => {
    return (
      <Container>
        <List
          className="min-h-[200px]"
          grid={{ column: 5 }}
          dataSource={player}
          renderItem={(item) => (
            <div className="h-full  p-1">
              <div className="rounded-md p-2 h-full   border-[1px] border-gray-100">
                <div>
                  <span className="font-medium text-blue-500">Tên</span>{" "}
                  {item.name}
                </div>
                <div>
                  <span className="font-medium text-blue-500">Số áo</span>{" "}
                  {item.number}
                </div>
                <div>
                  <span className="font-medium text-blue-500">Phòng thủ</span>{" "}
                  {item.defense}
                </div>
                <div>
                  {item.skills.map((item, index) => (
                    <Tag key={index} color="volcano" className="mt-1">
                      {item.name}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          )}
        />
      </Container>
    );
  }, [JSON.stringify(player)]);
  return <>{listMemo}</>;
};
export default ListPlayer;
