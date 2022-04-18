import React from "react";
import { Table as TableAntd, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import api from "../../service/apiService";
import permissionType from "./permissionTypeConst";

export default function Table(props) {
  const { getListPermission, query, totalItems } = props;
  const onConfirm = (id) => {
    deletePermission(id);
  };

  const deletePermission = async (id) => {
    try {
      await api.delete("permission/" + id);
      message.success("Đã xóa dữ liệu thành công!");
      const _query = {
        ...query,
        pageIndex: 1,
      };
      getListPermission(_query);
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
      title: "Tên quyền",
      dataIndex: "permissionName",
      key: "permissionName",
      render: (value, record, index) => (
        <div>
          <Link
            to={"/permission/detail/" + record.permissionId}
            className="text-blue-6"
          >
            {value}
          </Link>
        </div>
      ),
    },
    {
      title: "Key quyền",
      dataIndex: "permissionKey",
      key: "permissionKey",
      width: 150,
    },
    {
      title: "Loại quyền",
      dataIndex: "permissionType",
      key: "permissionType",
      render: (value, record, index) => {
        return (
          <div>
            {(permissionType.find((el) => el.key === value) || {}).name}
          </div>
        );
      },
    },

    {
      title: "Người tạo",
      dataIndex: "createdUser",
      key: "createdDate",
      width: 150,
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
      title: "Action",
      dataIndex: "",
      key: "",
      render: (value, record) => {
        return (
          <div className="flex items-center justify-center">
            <Link to={"/permission/edit/" + record.permissionId}>
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
              onConfirm={() => onConfirm(record.permissionId)}
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
      rowKey={"PermissionId"}
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
          getListPermission(_query);
        },
        showTotal: (total) => "Trang",
      }}
      locale={{
        emptyText: <span className="text-gray-8">Không có dữ liệu</span>,
      }}
    />
  );
}
