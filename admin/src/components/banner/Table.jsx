import React, { useState } from "react";
import { Table as TableAntd, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import api from "../../service/apiService";
import bannerType from "./bannerTypeConst";

export default function Table(props) {
  const { getListBanner, query, setQuery, totalItems } = props;
  const onConfirm = (id) => {
    deleteBanner(id);
  };

  const deleteBanner = async (id) => {
    try {
      await api.delete("banner/" + id);
      message.success("Đã xóa dữ liệu thành công!");
      const _query = {
        ...query,
        pageIndex: 1,
      };
      getListBanner(_query);
      setQuery(_query);
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
      title: "Loại banner",
      dataIndex: "BannerType",
      key: "BannerType",
      render: (value, record, index) => {
        return (
          <div>{(bannerType.find((el) => el.key === value) || {}).name}</div>
        );
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "ImageUrl",
      key: "ImageUrl",
      render: (value, record, index) => {
        return (
          <div>
            <img src={value} className="w-40 mx-auto" />
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
      title: "Kích hoạt",
      dataIndex: "Enable",
      key: "Enable",
      render: (value) => {
        return <div className="text-center">{value ? "Có" : "Không"}</div>;
      },
      width: 100,
    },

    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (value, record) => {
        return (
          <div className="flex items-center justify-center">
            <Link to={"/banner/edit/" + record.BannerId}>
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
              onConfirm={() => onConfirm(record.BannerId)}
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
      rowKey={"BannerId"}
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
          getListBanner(_query);
          setQuery(_query);
        },
        showTotal: (total) => "Trang",
      }}
      locale={{
        emptyText: <span className="text-gray-8">Không có dữ liệu</span>,
      }}
    />
  );
}
