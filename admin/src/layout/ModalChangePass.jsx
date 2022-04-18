import React, { useState } from "react";
import { message, Modal, Input } from "antd";
import api from "../service/apiService";

const ModalChangePass = (props) => {
  const { setIsShowModal, userId } = props;

  const [password, setPassword] = useState("");
  const [errPass, setErrPass] = useState("");

  const handleChangPassword = async () => {
    if (!password) {
      setErrPass("Mật khẩu là bắt buộc!");
      return;
    } else {
      setErrPass("");
    }
    try {
      await api.put("/user/change-password/" + userId, { password });
      message.success("Thay đổi mật khẩu thành công!");
    } catch (error) {
      message.error("Thay đổi mật khẩu thất bại!");
      console.log(error.message);
    } finally {
      setIsShowModal(false);
    }
  };

  return (
    <Modal
      className="modal_change_pass"
      title="Thay đổi mật khẩu"
      visible={true}
      onOk={handleChangPassword}
      onCancel={() =>
        setIsShowModal(false)
      }
      okText="Đổi mật khẩu"
      cancelText="Hủy bỏ"
    >
      <div>
        <label htmlFor="pass">
          Nhập mật khẩu mới<span className="text-red-6">*</span>
        </label>
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
