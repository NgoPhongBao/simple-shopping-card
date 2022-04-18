import React, { useState } from "react";
import { Table as TableAntd, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import api from "../../service/apiService";
import constStatus from "../cusorder/status.const.js";

export default function Table(props) {
  const { getList, query, setQuery, totalItems } = props;
  const onConfirm = (id) => {
    handleDelete(id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete("cusorder/" + id);
      message.success("Đã xóa dữ liệu thành công!");
      const _query = {
        ...query,
        pageIndex: 1,
      };
      getList(_query);
    } catch (error) {
      message.error("Xóa dữ liệu thất bại!");
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "",
      key: "stt",
      render: (value, record, index) => {
        const { pageIndex, pageSize } = query;
        return (
          <div className="text-center">

            {(pageIndex - 1) * pageSize + index + 1}
          </div>
        );
      },
      width: 50,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "cusName",
      key: "cusName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (value) => {
        return <div className="text-center">{value}</div>;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",

    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      render: (value) => {
        let nameStatus = constStatus.find((el) => el.value === value);
        nameStatus = nameStatus ? nameStatus.name : ""
        return <div className={value == 1 ? "text-green-6" : (value == 99 ? "text-red-6" : "")}>{nameStatus}</div>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (value) => {
        return <div className="text-center">{value}</div>;
      },
      width: 150,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "modifyDate",
      key: "modifyDate",
      render: (value) => {
        return <div className="text-center">{value}</div>;
      },
      width: 150,
    },
    {
      title: "Người cập nhật",
      dataIndex: "modifyUser",
      key: "modifyUser",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (value, record) => {
        return (
          <div className="flex items-center justify-center">
            <Link to={"/cusorder/edit/" + record.orderId}>
              <Button
                type="primary"
                className="bg-blue-6 m-1 flex items-center rounded-sm"
                icon={<EditOutlined />}
              >
                Cập nhật
              </Button>
            </Link>
          </div>
        );
      },
      width: "200px",
    },
  ];

  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  return (
    <TableAntd
      columns={columns}
      scroll={{ x: 1000 }}
      {...props}
      rowKey={"OrderId"}
      // rowSelection={{
      //   selectedRowKeys,
      //   onChange: (selectedRowKeys) => {
      //     setSelectedRowKeys(selectedRowKeys);
      //   },
      // }}
      bordered
      pagination={{
        pageSizeOptions: ["5", "10", "20", "50"],
        total: totalItems,
        current: query.pageIndex,
        pageSize: query.pageSize,
        showSizeChanger: true,
        onChange: (page, pageSize) => {
          let _query = {
            ...query,
            pageIndex: page,
            pageSize,
          };
          getList(_query);
        },
        showTotal: (total) => "Trang",
      }}
      locale={{
        emptyText: <span className="text-gray-8">Không có dữ liệu</span>,
      }}
    />
  );
}
