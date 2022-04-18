import { SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { message, Input, Button, Select } from "antd";
import api from "../../service/apiService";
import { useFormik } from "formik";
import status from "./status.const";

const initialVal = {
  orderId: "",
  status: "",
  modifyUser: "",
  phoneNumber: "",
  fullName: "",
  address: "",
  note: "",
};

export default function Form(props) {
  const { data, id, isDetail } = props;

  const formik = useFormik({
    initialValues: data ? data : initialVal,
    onSubmit(values) {
      handleAddOrUpdate(values);
    },
  });

  const handleAddOrUpdate = async (value) => {
    try {
      if (data) {
        await api.put("/cusorder/" + id, value);
        message.success("Cập nhật thành công!");
      } else {
        await api.post("/cusorder", value);
        message.success("Thêm mới thành công!");
        resetForm();
      }
    } catch (errors) {
      message.error("Thêm mới thất bại!");
    }
  };

  const {
    values,
    setFieldValue,
    errors,
    getFieldProps,
    handleSubmit,
    resetForm
  } = formik;

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="mx-auto"
    >
      <div className="h-full fadein ">
        <div className="grid lg:grid-cols-2 gap-3">
          <div className="rounded-md overflow-hidden shadow-md p-3 pb-6 border-t-2 border-blue-6 bg-blue-1">
            <span className="font-medium">Mô tả đơn hàng</span>
            <div className="mt-4">
              <label htmlFor="fullName">
                Tên khách hàng
              </label>
              <Input
                disabled={isDetail}
                placeholder="Tên khách hàng"
                id="fullName"
                {...getFieldProps("fullName")}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="phoneNumber">
                Số điện thoại
              </label>
              <Input
                disabled={isDetail}
                placeholder="Số điện thoại"
                id="phoneNumber"
                {...getFieldProps("phoneNumber")}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="address">
                Địa chỉ
              </label>
              <Input
                disabled={isDetail}
                placeholder="Địa chỉ"
                id="address"
                {...getFieldProps("address")}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="address">
                Ghi chú
              </label>
              <Input.TextArea
                disabled={isDetail}
                placeholder="Ghi chú"
                id="note"
                {...getFieldProps("note")}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="address">
                Trạng thái đơn hàng
              </label>
              <Select onChange={(value) => {
                setFieldValue('status', value)
              }
              } value={values.status} placeholder="Trạng thái đơn hàng" className="w-full">
                {
                  status.map((el) => {
                    return <Select.Option value={el.value} key={el.value} disabled={el.value < data.status ? true : false}>
                      {el.name}
                    </Select.Option>
                  })
                }
              </Select>
            </div>
          </div>
          <div className="rounded-md overflow-hidden shadow-md p-3 pb-6 border-t-2 border-blue-6 bg-blue-1">
            <span className="font-medium">Chi tiết đơn hàng</span>
            <div className="mt-4">
              <table>
                <thead>
                  <tr className="whitespace-nowrap font-medium">
                    <td className="p-2">STT</td>
                    <td className="p-2">Hình ảnh</td>
                    <td className="p-2">Tên sản phẩm</td>
                    <td className="p-2">Giá</td>
                    <td className="p-2">Số lượng</td>
                    <td className="px-2">Thành tiền</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    values.products.map((el, i) => {
                      return <tr key={el.productId} className="border-t">
                        <td className="p-2">{i + 1}</td>
                        <td className="p-2">
                          <img src={el.urlImage} width="50" /> 
                        </td>
                        <td className="p-2">{el.productName}</td>
                        <td className="p-2 text-right whitespace-nowrap">{new Intl.NumberFormat().format(el.price)} đ</td>
                        <td className="p-2 text-right whitespace-nowrap">{el.number}</td>
                        <td className="p-2 text-right whitespace-nowrap">{new Intl.NumberFormat().format(el.price * el.number)} đ</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
              <div className="border-t-2 w-1/2 float-right clear-both mt-4" />
              <p className="font-medium w-1/2 text-xl clear-both float-right mt-2 text-center">Tổng cộng: {new Intl.NumberFormat().format((() => {
                return values.products.reduce((prev, current) => {
                  return prev + current.price * current.number
                }, 0)
              })())} đ</p>
            </div>
          </div>
        </div>

      </div>
      <div className="mt-5 flex justify-center sm:justify-end items-center">
        {isDetail ? null : (
          <Button
            htmlType="submit"
            icon={<SaveOutlined />}
            type="primary"
            className="flex items-center bg-blue-6 mr-2"
          >
            Lưu
          </Button>
        )}

        <Link to="/cusorder">
          <Button
            icon={<CloseCircleOutlined />}
            type="primary"
            className="flex items-center bg-gray-8 focus:bg-gray-7 active:bg-gray-7 hover:bg-gray-7 border-0"
          >
            Đóng
          </Button>
        </Link>
      </div>
    </form>
  );
}
