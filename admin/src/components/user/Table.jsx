import React from "react";
import { Table as TableAntd, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import api from "../../service/apiService";

export default function Table(props) {
  const { getListUser, query, totalItems, setModal } = props;
  const onConfirm = (id) => {
    deleteUser(id);
  };

  const deleteUser = async (id) => {
    try {
      await api.delete("user/" + id);
      message.success("Đã xóa dữ liệu thành công!");
      const _query = {
        ...query,
        pageIndex: 1,
      };
      getListUser(_query);
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
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (value, record, index) => (
        <div>
          <Link to={"/user/detail/" + record.userId} className="text-blue-6">
            {value}
          </Link>
        </div>
      ),
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 150,
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
            <Button
              type="primary"
              className="bg-cyan-6 hover:bg-cyan-4 m-1 flex items-center rounded-sm border-cyan-6 hover:border-cyan-4"
              icon={<LockOutlined />}
              onClick={() =>
                setModal({
                  isOpen: true,
                  userId: record.userId,
                })
              }
            >
              Đổi mật khẩu
            </Button>
            <Link to={"/user/edit/" + record.userId}>
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
              onConfirm={() => onConfirm(record.userId)}
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
      rowKey={"UserId"}
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
          getListUser(_query);
        },
        showTotal: (total) => "Trang",
      }}
      locale={{
        emptyText: <span className="text-gray-8">Không có dữ liệu</span>,
      }}
    />
  );
}
