import { useStateApp } from "@/components/providers/state-app";
import AddPlayer from "./components/add-player";
import ListPlayer from "./components/list-player";
import { Row, Col } from "antd";
import Play from "./components/play";
import CollapseDetail from "./components/collapse-detail-round";
import Container from "./components/container";
import Top10Player from "./components/top-player";
import BarChart from "./components/chart-bar";
import AddPlayerList from "./components/add-player-list";

function App() {
  const {
    actionRound: {
      roundCurrent,
      roundDataCustomer: { top10CorcePlayerAllRound },
    },
  } = useStateApp();

  return (
    <div className="w-[90%] mx-auto mt-7 mb-4">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Container>
            <h1 className="font-medium text-center text-2xl text-blue-600">
              {" "}
              {roundCurrent > 10
                ? "Kết thúc trò chơi"
                : `Vòng : ${roundCurrent}`}
            </h1>
            <div className="mt-20 mb-4 flex justify-center">
              <AddPlayerList />
            </div>
            <div className="flex items-center justify-center  ">
              <AddPlayer />

              <div className="ml-4">
                <Play />
              </div>
            </div>
          </Container>
        </Col>
        <Col span={16}>
          <ListPlayer />
        </Col>
        <Col span={18}>
          <Container>
            <CollapseDetail />
          </Container>
        </Col>
        <Col span={6}>
          <Container>
            <Top10Player
              title={`Thứ hạng cầu thủ sau ${roundCurrent - 1} vòng`}
              top10Player={top10CorcePlayerAllRound}
            />
          </Container>
        </Col>
        <Col span={24}>
          <Container>
            <BarChart />
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default App;
