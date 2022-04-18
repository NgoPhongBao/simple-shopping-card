import React, { useState } from "react";
import { Table as TableAntd, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import api from "../../service/apiService";

export default function Table(props) {
  const { getList, query, setQuery, totalItems } = props;
  const onConfirm = (id) => {
    handleDelete(id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete("brand/" + id);
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
            <Link
              to={"/brand/detail/" + record.brandId}
              className="text-blue-6"
            >
              {(pageIndex - 1) * pageSize + index + 1}
            </Link>
          </div>
        );
      },
      width: 50,
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "brandName",
      key: "brandName",
      render: (value, record, index) => {
        return (
          <div>
            <Link
              to={"/brand/detail/" + record.brandId}
              className="text-blue-6"
            >
              {value}
            </Link>
          </div>
        );
      },
    },
    {
      title: "Người tạo",
      dataIndex: "CreatedUser",
      key: "CreatedUser",
      width: 150,
    },
    {
      title: "Ngày tạo",
      dataIndex: "CreatedDate",
      key: "CreatedDate",
      render: (value) => {
        return <div className="text-center">{value}</div>;
      },
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (value, record) => {
        return (
          <div className="flex items-center justify-center">
            <Link to={"/brand/edit/" + record.brandId}>
              <Button
                type="primary"
                className="bg-blue-6 m-1 flex items-center rounded-sm"
                icon={<EditOutlined />}
              >
                Sửa
              </Button>
            </Link>
            <Popconfirm
              placement="topLeft"
              title={"Bạn có chắc chắn muốn xóa?"}
              onConfirm={() => onConfirm(record.brandId)}
              okText="Yes"
              cancelText="No"
              className="popup-confirm"
            >
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                danger
                className="m-1 flex items-center rounded-sm"
              >
                Xóa
              </Button>
            </Popconfirm>
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
      rowKey={"brandId"}
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
