import {
  Col,
  Collapse,
  CollapseProps,
  Row,
  Table,
  TableProps,
  Tag,
} from "antd";
import { useStateApp, RoundData } from "../providers/state-app";
import React, { useMemo } from "react";
import { Passer, Playerdata } from "@/types/data/play-data";

import Top10Player from "../top-player";

interface DataType {
  key: string;
  stt: string;
  passer: Passer;
  passReceiver: string;
  punishedPerson: string;
  result: "Thành công" | "Thất bại";
  score: number;
}

const columns: TableProps<DataType>["columns"] = [
  {
    width: "4vw",
    title: "Stt",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Cầu thủ chuyền",
    dataIndex: "passer",
    key: "passer",
    render: (passer: Passer) => {
      return (
        <div>
          <div className="font-medium text-blue-500 text-center">
            {passer.name}
          </div>
          <div className="text-center">
            {passer.skills.name} -- {passer.skills.score}đ
          </div>
        </div>
      );
    },
  },
  {
    title: "Cầu thủ nhận bóng",
    dataIndex: "passReceiver",
    key: "passReceiver",
  },
  {
    title: "Cầu thủ bị phạt",
    dataIndex: "punishedPerson",
    key: "punishedPerson",
  },
  {
    title: "Điểm được nhận sau lượt chuyền",
    dataIndex: "score",
    key: "score",
  },
  {
    title: "Trạng thái chyền",
    key: "result",
    dataIndex: "result",
    render: (result) => {
      return (
        <Tag color={result === "Thành công" ? "green" : "red"}>{result}</Tag>
      );
    },
  },
];

const TableChild: React.FC<{ data: DataType[] }> = ({ data }) => {
  return (
    <Table<DataType>
      scroll={{ scrollToFirstRowOnChange: true, y: "40vh" }}
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.stt}
    />
  );
};
const CollapseDetail = () => {
  const {
    actionRound: {
      roundData,
      roundDataCustomer: { scoreGroupRound },
    },
  } = useStateApp();

  const CollapseMemo = useMemo(() => {
    const customerData = (data: RoundData): CollapseProps["items"] => {
      const items: CollapseProps["items"] = Object.entries(data).map(
        ([key, value]) => {
          const item: Playerdata[] = value;
          const customer = item.map((item, index) => ({
            stt: (index + 1).toString(),
            passer: item.passer,
            passReceiver: item.passReceiver.name,
            punishedPerson: item.punishedPerson.name,
            result: item.passer.result,
            score: item.passer.score,
          })) as DataType[];
          return {
            key,
            label: "Kết quả vòng " + key,
            children: (
              <Row gutter={[8, 8]}>
                <Col span={18}>
                  <TableChild data={customer} />
                </Col>
                <Col span={6}>
                  <Top10Player
                    srcoll={true}
                    top10Player={scoreGroupRound[key].top10sorcePlayer}
                  />
                </Col>
              </Row>
            ),
          };
        }
      );

      return items;
    };

    return (
      <Collapse items={customerData(roundData)} defaultActiveKey={["1"]} />
    );
  }, [JSON.stringify(roundData)]);
  return <>{CollapseMemo}</>;
};
export default CollapseDetail;
