import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getContext } from "../../context";
import { formatPrice } from "../../utils";
import { toast } from "react-toastify";
import api from "../../service/apiService"

export default function Header(props) {
  const { storeInfo, productCategoryMenu } = props;
  const router = useRouter();
  const { cart, setCart } = getContext();

  const [isShowMenuMoblie, setIsShowMenuMobile] = useState(false);
  const [isShowCardDropdown, setIsShowCardDropdown] = useState(false);
  const [query, setQuery] = useState({
    keyword: "",
  });

  const getProduct = (query) => {
    setQuery(query);
    router.push(
      {
        pathname: "/san-pham",
        query: { ...query, keyword: query.keyword.trim() },
      },
      undefined,
      { scroll: false }
    );
  };

  useEffect(() => {

    updateView();

    window.addEventListener("mouseup", function (event) {
      const elm = document.querySelector(".shopping-cart-content");
      if (elm && !elm.contains(event.target)) {
        setIsShowCardDropdown(false);
      }
    });
  }, []);

  const updateView = async () => {
    await api.put("/view")
  }

  const countNumberProduct = (cart) => {
    const number = cart.reduce((prev, current) => {
      return prev + current.number;
    }, 0);
    return number;
  };

  const renderTotalMoney = (cart) => {
    const total = cart.reduce((prev, current) => {
      return prev + current.number * current.price;
    }, 0);
    return total;
  };

  const removeItemCart = (index) => {
    const _cart = [...cart];
    _cart.splice(index, 1);
    setCart(_cart);
    localStorage.setItem("cart", JSON.stringify(_cart));
    // toast.success("Đã xóa sản phẩm khỏi giỏ hàng.");
  };

  return (
    <header className="header-area theme-bg">
      {isShowMenuMoblie ? (
        <div
          className="bg_cover fadein"
          onClick={() => setIsShowMenuMobile(false)}
        ></div>
      ) : null}
      <div className="header-middle ptb-40 border-bottom-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-12">
              <div className="logo logo-mrg">
                <Link href="/">
                  <a>
                    <img
                      src={storeInfo.logoUrl}
                      alt={storeInfo.storeName}
                      style={{
                        maxWidth: "150px",
                      }}
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-9 col-md-12 col-12">
              <div className="header-contact-search-wrapper f-right">
                <div className="header-contact middle-same">
                  <div className="header-contact-icon">
                    <i className="pe-7s-headphones" />
                  </div>
                  <div className="header-contact-content">
                    <p>
                      Gọi cho chúng tôi <br />
                      Hotline: <a href={"tel:" + storeInfo.phoneNumber} className="text-white">{storeInfo.phoneNumber}</a>
                    </p>
                  </div>
                </div>
                <div className="header-search middle-same">
                  <form className="header-search-form">
                    <input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm ..."
                      value={query.keyword}
                      onChange={(e) => {
                        setQuery({ keyword: e.target.value });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          getProduct(query);
                        }
                      }}
                    />
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        getProduct(query);
                      }}
                    >
                      <i className="ion-ios-search-strong" />
                    </button>
                  </form>
                </div>
                <div className="header-cart middle-same">
                  <button
                    className="icon-cart"
                    onClick={(e) => setIsShowCardDropdown(!isShowCardDropdown)}
                  >
                    <i className="pe-7s-shopbag cart-bag" />
                    <span className="count-amount">
                      {formatPrice(renderTotalMoney(cart))} đ
                    </span>
                    <i className="ion-chevron-down cart-down" />
                    <span className="count-style">
                      {countNumberProduct(cart)}
                    </span>
                  </button>
                  {isShowCardDropdown ? (
                    <div className="shopping-cart-content d-block">
                      {!cart.length ? (
                        <p>Không có sản phẩm nào trong giỏ hàng.</p>
                      ) : (
                        <>
                          <ul>
                            {cart.map((el, index) => {
                              return (
                                <li
                                  className="single-shopping-cart position-relative"
                                  key={el.productId}
                                >
                                  <div className="shopping-cart-img">
                                    <Link href={"/" + el.url}>
                                      <a>
                                        <img
                                          alt={el.productName}
                                          src={
                                            el.images
                                              ? el.images[0]
                                              : el.imageUrl
                                          }
                                          style={{ maxWidth: "80px" }}
                                        />
                                      </a>
                                    </Link>
                                  </div>
                                  <div className="shopping-cart-title">
                                    <h4>
                                      <Link href={"/" + el.url}>
                                        <a>{el.productName}</a>
                                      </Link>
                                    </h4>
                                    <h6>Số lượng: {el.number}</h6>
                                    <span>Giá: {formatPrice(el.price)} đ</span>
                                  </div>
                                  <div
                                    className="shopping-cart-delete position-absolute"
                                    style={{ top: 0, right: 0 }}
                                  >
                                    <a
                                      onClick={() => removeItemCart(index)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="ion-android-close" />
                                    </a>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                          <div className="shopping-cart-total">
                            {/* <h4>
                          Shipping : <span>$20.00</span>
                        </h4> */}
                            <h4>
                              Tổng tiền :{" "}
                              <span className="shop-total">
                                {formatPrice(renderTotalMoney(cart))} đ
                              </span>
                            </h4>
                          </div>
                        </>
                      )}

                      <div className="shopping-cart-btn">
                        <Link href="/gio-hang">
                          <a
                            className="btn-style btn-hover"
                            style={{ cursor: "pointer" }}
                            onClick={() => setIsShowCardDropdown(false)}
                          >
                            Đặt hàng
                          </a>
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container">
          <div className="row main-menu-moblie">
            <div className="col-12 ">
              <div className="d-flex justify-content-between align-items-center">
                <div className="logo mobile-logo">
                  <Link href="/">
                    <a>
                      <img
                        src={storeInfo.logoUrl}
                        alt={storeInfo.storeName}
                        style={{
                          maxWidth: "100px",
                        }}
                      />
                    </a>
                  </Link>
                </div>
                <span
                  className="icon-bar"
                  onClick={() => setIsShowMenuMobile(!isShowMenuMoblie)}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </span>{" "}
              </div>
            </div>
          </div>

          <div
            className={`main-menu elec-menu ${isShowMenuMoblie ? "show" : ""}`}
          >
            <nav>
              <ul className="d-flex justify-content-center">
                <li className="product_category_menu">
                  <div className="product-category-btn">
                    <span style={{ paddingRight: "4px" }}>
                      <i className="fa fa-bars" aria-hidden="true" />
                    </span>
                    <Link href={"/danh-muc-san-pham"}>
                      <a onClick={() => setIsShowMenuMobile(false)}>
                        {" "}
                        Danh mục sản phẩm
                      </a>
                    </Link>
                  </div>
                  <ul>
                    {productCategoryMenu.map((el) => {
                      return (
                        <li
                          key={el.productCategoryId}
                          className="category_item"
                        >
                          <Link href={"/" + el.url}>
                            <a onClick={() => setIsShowMenuMobile(false)}>
                              {el.productCategoryName}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>
                  <Link href="/">
                    <a onClick={() => setIsShowMenuMobile(false)}>Trang chủ</a>
                  </Link>
                </li>

                <li>
                  <Link href="/blog">
                    <a onClick={() => setIsShowMenuMobile(false)}>Blog</a>
                  </Link>
                </li>
                <li>
                  <Link href="/gioi-thieu">
                    <a onClick={() => setIsShowMenuMobile(false)}>
                      Giới thiệu{" "}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/lien-he">
                    <a onClick={() => setIsShowMenuMobile(false)}>Liên hệ</a>
                  </Link>
                </li>
              </ul>
            </nav>
            <span
              className="btn_close_menu px-3"
              onClick={() => setIsShowMenuMobile(false)}
            >
              &times;
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
