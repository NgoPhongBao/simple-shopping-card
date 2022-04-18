import Link from "next/link";
import React, { useState } from "react";
import { getContext } from "../../context";
import { formatPrice } from "../../utils";
import { toast } from "react-toastify";
import api from "../../service/apiService";

export default function Cart() {
  const { cart, setCart } = getContext();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });

  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  const [err, setErr] = useState("");

  const removeItemCart = (index) => {
    const _cart = [...cart];
    _cart.splice(index, 1);
    setCart(_cart);
    localStorage.setItem("cart", JSON.stringify(_cart));
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng.");
  };

  const deleteCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng.");
  };

  const changeNumber = (index, number) => {
    const _cart = [...cart];
    _cart[index].number = number * 1;
    setCart(_cart);
    localStorage.setItem("cart", JSON.stringify(_cart));
  };

  const renderTotalMoney = (cart) => {
    const total = cart.reduce((prev, current) => {
      return prev + current.number * current.price;
    }, 0);
    return total;
  };

  const handleBuy = async () => {
    setErr("");
    if (!formData.phoneNumber) {
      setErr("Vui lòng nhập số điện thoại của bạn.");
      return;
    }

    try {
      const data = {
        ...formData,
        cart,
      };
      await api.post("/order", data);
      toast.success("Đặt hàng thành công.");
      setIsOrderSuccess(true);
      setCart([]);
      localStorage.removeItem("cart");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      toast.error("Đặt hàng không thành công.");
    }
  };

  return (
    <div className="cart-main-area pt-60 pb-65">
      {isOrderSuccess ? (
        <div className="container">
          <p className="text-center h5" style={{ fontWeight: "400" }}>
            Cảm ơn bạn đã đặt hàng! <br /> Chúng tôi sẽ liên hệ bạn trong thời
            gian sớm nhất để xác nhận đơn hàng.
          </p>
          <div className="product-action mt-5">
            <Link href="/danh-muc-san-pham">
              <a className="action-cart">Tiếp tục mua sắm</a>
            </Link>
          </div>
        </div>
      ) : (
        <div className="container">
          <h3 className="page-title">Giỏ hàng của bạn</h3>
          <div className="row">
            {!cart.length ? (
              <>
                <p className="text-center">
                  Không có sản phẩm nào trong giỏ hàng.
                </p>
                <div className="product-action mt-5">
                  <Link href="/danh-muc-san-pham">
                    <a className="action-cart">Tiếp tục mua sắm</a>
                  </Link>
                </div>
              </>
            ) : (
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <form>
                  <div className="table-content table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th />
                          <th>Tên sản phẩm</th>
                          <th>Giá</th>
                          <th>Số lượng</th>
                          <th>Thành tiền</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((el, index) => {
                          return (
                            <tr key={el.productId}>
                              <td className="product-thumbnail">
                                <Link href={"/" + el.url}>
                                  <a>
                                    <img
                                      src={
                                        el.images ? el.images[0] : el.imageUrl
                                      }
                                      alt={el.productName}
                                      style={{ maxWidth: "80px" }}
                                    />
                                  </a>
                                </Link>
                              </td>
                              <td
                                className="product-name"
                                style={{ textAlign: "left" }}
                              >
                                <Link href={"/" + el.url}>
                                  <a>{el.productName}</a>
                                </Link>
                              </td>
                              <td className="product-price-cart">
                                <span className="amount">
                                  {formatPrice(el.price)} đ
                                </span>
                              </td>
                              <td className="product-quantity">
                                <div className="pro-dec-cart">
                                  <input
                                    className="cart-plus-minus-box"
                                    type="number"
                                    value={el.number}
                                    min={1}
                                    onChange={(e) =>
                                      changeNumber(index, e.target.value)
                                    }
                                    name="qtybutton"
                                  />
                                </div>
                              </td>
                              <td className="product-subtotal">
                                {formatPrice(el.price * el.number)} đ
                              </td>
                              <td className="product-remove">
                                <a
                                  style={{ cursor: "pointer" }}
                                  onClick={() => removeItemCart(index)}
                                >
                                  <i className="fa fa-times" />
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="cart-shiping-update-wrapper">
                        <div className="cart-shiping-update">
                          <Link href="/danh-muc-san-pham">
                            <a>Tiếp tục mua sắm</a>
                          </Link>
                        </div>
                        <div className="cart-clear">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              deleteCart();
                            }}
                          >
                            Xóa tất cả sản phẩm khỏi giỏ hàng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-white">
                          Nhập thông tin của bạn
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <div className="tax-select-wrapper">
                          <div className="tax-select mb-3">
                            <label htmlFor="fullName" className="mb-1">
                              Tên của bạn
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              placeholder="Tên của bạn"
                              value={formData.fullName}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  fullName: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="tax-select mb-3">
                            <label htmlFor="phoneNumber" className="mb-1">
                              Số điện thoại
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="phoneNumber"
                              placeholder="Số điện thoại"
                              value={formData.phoneNumber}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  phoneNumber: e.target.value,
                                });
                              }}
                            />
                            <span className="text-danger">{err}</span>
                          </div>
                          <div className="tax-select mb-3">
                            <label
                              htmlFor="address"
                              className="mb-1"
                              placeholder="Địa chỉ"
                            >
                              Địa chỉ
                            </label>
                            <input
                              type="text"
                              id="address"
                              placeholder="Địa chỉ"
                              value={formData.address}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  address: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Tổng đơn hàng
                        </h4>
                      </div>
                      {/* <h5>
                    Total products <span>$260.00</span>
                  </h5> */}
                      <h4 className="grand-totall-title mt-4">
                        Tổng tiền{" "}
                        <span>{formatPrice(renderTotalMoney(cart))} đ</span>
                      </h4>
                      <a
                        className="h6"
                        style={{ cursor: "pointer" }}
                        onClick={handleBuy}
                      >
                        Đặt hàng
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
