import { Button, Form, FormProps, Input, InputNumber, Modal } from "antd";
import { notifySuccess, notifyError } from "@/utils/notify.helper";
import { memo, useState } from "react";
import { useStateApp } from "@/components/providers/state-app";
import Playeradd from "@/utils/player";
type FieldType = {
  name: string;
  number: number;
};
const AddPlayer = () => {
  const {
    actionPlayer: { setPlayer, player },
  } = useStateApp();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (player.length >= 10) {
      notifyError("Chỉ cho phép tối đa 10 cầu thủ");
      return;
    }
    if (player.some((p) => p.number === values.number)) {
      notifyError("Số  áo cầu thủ đã tồn tại");
      return;
    }
    setPlayer((state) => {
      const newPlayer = Playeradd({
        name: values.name,
        number: values.number,
        id: player.length + 1 + "",
      });
      return [...(state ?? []), newPlayer];
    });
    setIsModalOpen(false);
    notifySuccess("Thêm cầu thủ thành công");
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm cầu thủ
      </Button>
      <Modal
        title="Thêm cầu thủ"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
        destroyOnClose={true}
      >
        <Form
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item<FieldType>
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng chọn tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="number"
            label="Số áo"
            rules={[
              {
                type: "number",
                min: 0,

                required: true,
                message: "Vui lòng chọn số áo!",
              },
            ]}
          >
            <InputNumber className="w-full" />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default memo(AddPlayer);
