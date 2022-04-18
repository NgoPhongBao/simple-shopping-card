import React from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import api from "../../service/apiService";
import Link from "next/link";

export default function AboutUs(props) {
  const { aboutData = {} } = props;
  const { title, content, imageUrl } = aboutData;
  return (
    <>
      <Breadcrumb breadcrumb={[{ url: "gioi-thieu", name: "Giới thiệu" }]} />
      <div className="about-us-area pt-80 pb-80 fadein">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-7 d-flex align-items-center">
              <div className="overview-content-2">
                <h2>{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: content }} />

                <div className="overview-btn mt-45">
                  <Link href="/danh-muc-san-pham">
                    <a className="btn-style-2">Xem sản phẩm</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-5">
              <div className="overview-img text-center">
                <img src={imageUrl} alt={title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const aboutRes = await api.get("/about");
    return {
      props: {
        aboutData: aboutRes.data || {},
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
