import React, { useState } from "react";
import { message, Modal, Input } from "antd";
import api from "../../service/apiService";

const ModalChangePass = (props) => {
  const { modal, setModal } = props;

  const [password, setPassword] = useState("");
  const [errPass, setErrPass] = useState("");

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleChangPassword = async () => {
    if (!password) {
      setErrPass("Mật khẩu là bắt buộc!");
      return;
    } else {
      setErrPass("");
    }
    setConfirmLoading(true);
    try {
      await api.put("/user/change-password/" + modal.userId, { password });
      message.success("Thay đổi mật khẩu thành công!");
    } catch (error) {
      message.error("Thay đổi mật khẩu thất bại!");
      console.log(error.message);
    } finally {
      setModal({
        isOpen: false,
        userId: null,
      });
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      className="modal_change_pass"
      title="Thay đổi mật khẩu"
      visible={true}
      onOk={handleChangPassword}
      confirmLoading={confirmLoading}
      onCancel={() =>
        setModal({
          isOpen: 0,
          userId: null,
        })
      }
      okText="Đổi mật khẩu"
      cancelText="Hủy bỏ"
    >
      <div>
        <label htmlFor="pass">Nhập mật khẩu mới<span className="text-red-6">*</span></label>
        <Input.Password
          id="pass"
          name="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errPass ? <p className="text-red-6">{errPass}</p> : null}
      </div>
    </Modal>
  );
};

export default ModalChangePass;
