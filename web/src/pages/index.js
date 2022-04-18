import { useState } from "react";
import api from "../service/apiService";
import Slider from "react-slick";
import Link from "next/link";

import BotSlider from "../components/home/BotSlider";
import TabProduct from "../components/home/TabProduct";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export default function Home(props) {
  const { banner = {}, products = [], topCategory = {} } = props;
  const { mainBanner = [], subBanner = [], middleBanner = null } = banner;
  return (
    <>
      <Slider className="home_slider fadein" {...settings}>
        {mainBanner.map((el) => {
          if (el.link) {
            return (
              <Link href={el.link} key={el.imageUrl}>
                <a className="slide_item">
                  <img src={el.imageUrl} />
                </a>
              </Link>
            );
          }
          return (
            <div className="slide_item" key={el.imageUrl}>
              <img src={el.imageUrl} />
            </div>
          );
        })}
      </Slider>
      <div className="banner-area banner-negative-mrg-2 fadein">
        <div className="container-fluid p-0">
          <div className="row g-0">
            {subBanner.map((el) => {
              return (
                <div className="col-lg-6 col-md-6" key={el.imageUrl}>
                  <div className="banner-img banner-hover">
                    <Link href={el.link ? el.link : "#"} key={el.imageUrl}>
                      <a>
                        <img src={el.imageUrl} />
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <TabProduct
        newProducts={products.filter((el) => el.isNew * 1 === 1)}
        topSaleProducts={products.filter((el) => el.isTopSale * 1 === 1)}
      />
      {middleBanner ? (
        <div className="pb-30">
          <Link href={middleBanner.link || "#"}>
            <a>
              <img src={middleBanner.imageUrl} className="w-100" />
            </a>
          </Link>
        </div>
      ) : null}
      {Object.keys(topCategory).length && topCategory.products.length ? (
        <BotSlider topCategory={topCategory} />
      ) : null}
    </>
  );
}

export async function getServerSideProps() {
  try {
    const bannerRes = await api.get("/banner");
    const productRes = await api.get("/product/home");
    const topCategoryRes = await api.get("/product-category/top");
    return {
      props: {
        banner: bannerRes.data || {},
        products: productRes.data || [],
        topCategory: topCategoryRes.data || {},
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
