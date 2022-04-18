import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Link from "next/link";
import { formatPrice } from "../../utils";
import { getContext } from "../../context";
import { toast } from "react-toastify";

const settings = {
  slidesPerView: 1,
  modules: [Navigation],
  navigation: {
    nextEl: ".swiper-btn-next",
    prevEl: ".swiper-btn-prev",
  },
  breakpoints: {
    640: {
      width: 640,
      slidesPerView: 1,
    },
    768: {
      width: 768,
      slidesPerView: 2,
    },
    1024: {
      width: 1024,
      slidesPerView: 4,
    },
  },
};

export default function Related(props) {
  const { related = [] } = props;
  const { cart, setCart } = getContext();
  return (
    <div className="product-area pb-45">
      <div className="container position-relative">
        <div className="section-border mb-10">
          <h4 className="section-title section-bg-white">Sản phẩm liên quan</h4>
        </div>
        <div className="headphone-slider-active product-slider nav-style">
          <Swiper {...settings}>
            {related.map((el) => {
              return (
                <SwiperSlide key={el.productId}>
                  <div className="devita-product-2 product_card">
                    <div className="product-img">
                      <Link href={el.url}>
                        <a>
                          <img src={el.imageUrl} alt={el.productName} />
                        </a>
                      </Link>
                    </div>
                    <div className="product_card_content mt-2">
                      <div className="text-center px-3">
                        <span>
                          {el.brandName
                            ? `${el.productCategoryName}, ${el.brandName}`
                            : el.productCategoryName}
                        </span>
                        <h4>
                          <Link href={el.url}>
                            <a>{el.productName}</a>
                          </Link>
                        </h4>
                        <div className="product-price-wrapper">
                          <span>{formatPrice(el.price)} đ</span>
                        </div>
                      </div>
                    </div>
                    <div className="product-action pb-4 mt-2">
                      <a
                        className="action-cart"
                        title="Add To Cart"
                        style={{ cursor: "pointer" }}
                        onClick={() => addToCart(el)}
                      >
                        Thêm vào giỏ hàng
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="arrows_swiper_top_right position-absolute ">
          <span className="swiper-btn-prev">
            <i className="ion-ios-arrow-back"></i>
          </span>
          <span className="swiper-btn-next">
            <i className="ion-ios-arrow-forward"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
