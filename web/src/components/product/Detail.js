import React, { useState } from "react";
import { formatPrice } from "../../utils";
import Desc from "./Desc";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { getContext } from "../../context";
import { toast } from "react-toastify";

const settings = {
  slidesPerView: 2,
  modules: [Navigation],
  navigation: {
    nextEl: ".arrow.next",
    prevEl: ".arrow.prev",
  },
  spaceBetween: 10,
  breakpoints: {
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
  },
};

export default function Detail(props) {
  const { productData = {} } = props;
  const { cart, setCart } = getContext();
  const {
    productName,
    price = 0,
    images = [],
    productCategoryName = "",
    shortDescription = "",
    brandName = "",
    productDescription,
    attributes = [],
  } = productData;

  const [pickedImg, setPickedImg] = useState(images[0] || "");

  const [number, setNumber] = useState(1);

  const addToCart = (product) => {
    const _cart = [...cart];
    const index = _cart.findIndex((el) => el.productId === product.productId);
    if (index >= 0) {
      _cart[index].number = number;
    } else {
      product.number = number;
      _cart.push(product);
    }
    setCart(_cart);
    localStorage.setItem("cart", JSON.stringify(_cart));
    toast.success("Đã thêm sản phẩm vào giỏ hàng", { hideProgressBar: true });
  };

  return (
    <div className="product-details mt-65 mb-40">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="product_detail_image">
              <div className="picked_img ">
                <img src={pickedImg} alt={productName} />
              </div>
              <div className="m-20 mt-30 product_detail_image_slider position-relative">
                <Swiper {...settings} className="w-100">
                  {images.map((el) => {
                    return (
                      <SwiperSlide key={el}>
                        <div className="product_detail_image_el">
                          <img
                            src={el}
                            alt={productName}
                            onClick={() => setPickedImg(el)}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <span className="arrow prev">
                  <i className="ion-ios-arrow-back"></i>
                </span>
                <span className=" arrow next">
                  <i className="ion-ios-arrow-forward"></i>
                </span>
              </div>
            </div>
            <Desc productDescription={productDescription} />
          </div>
          <div className="col-lg-5 col-md-12">
            <div className="product-details-content">
              <h4>{productName}</h4>
              <span className="d-block my-2">{formatPrice(price)} đ</span>
              <p className="mb-2">{shortDescription}</p>
              <div className="quality-add-to-cart">
                <div className="quality">
                  <label>Số lượng:</label>
                  <input
                    className="cart-plus-minus-box"
                    type="number"
                    name="qtybutton"
                    value={number}
                    onChange={(e) => {
                      setNumber(e.target.value * 1);
                    }}
                  />
                </div>
                <div className="product-action">
                  <a
                    className="action-cart"
                    title="Thêm vào giỏ hàng"
                    style={{ cursor: "pointer" }}
                    onClick={() => addToCart(productData)}
                  >
                    Thêm vào giỏ hàng
                  </a>
                </div>
              </div>
              <div className="pro-dec-categories">
                <ul>
                  <li className="categories-title">Danh mục:</li>
                  <li>{productCategoryName}</li>
                  {brandName ? (
                    <>
                      <li className="d-block"></li>
                      <li className="categories-title">Thương hiệu:</li>
                      <li>{brandName}</li>
                    </>
                  ) : null}
                </ul>
              </div>
              {attributes.length ? (
                <div className="mt-4">
                  <h5 className="fw-bold">Thông số kỹ thuật</h5>
                  <table className="w-100">
                    {attributes.map((el, i) => {
                      return (
                        <tr
                          style={{
                            background: i % 2 === 0 ? "#f5f5f5" : "#fff",
                          }}
                        >
                          <td style={{ width: "30%" }} className="p-2">
                            {el.name}
                          </td>
                          <td style={{ width: "70%" }} className="p-2">
                            {el.attValue}
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
