import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Footer(props) {
  const { storeInfo } = props;
  const [isShowMaps, setIsShowMaps] = useState(false);
  useEffect(() => {
    window.addEventListener("mouseup", function (event) {
      const modalContent = document.querySelector(".modal_content");
      if (event.target != modalContent) {
        setIsShowMaps(false);
      }
    });
  }, []);

  return (
    <>
      <footer className="footer-area black-bg pt-65">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget mb-40">
                <div className="footer-title mb-30">
                  <h4>Về chúng tôi</h4>
                </div>
                <div className="footer-about">
                  <p>
                    {storeInfo.shortDescription}
                  </p>
                  <div className="footer-map">
                    <div
                      className="btn text-white p-0"
                      onClick={() => setIsShowMaps(true)}
                    >
                      <i className="ion-ios-location-outline" /> Xem bản đồ
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget mb-40">
                <div className="footer-title mb-30">
                  <h4>Trang</h4>
                </div>
                <div className="footer-content">
                  <ul>
                    <li>
                      <Link href="/gioi-thieu">
                        <a>Giới thiệu</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/lien-he">
                        <a>Liên hệ</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog">
                        <a>Blog</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget mb-40">
                <div className="footer-title mb-30">
                  <h4>Thông tin liên hệ</h4>
                </div>
                <div className="footer-contact">
                  <ul>
                    <li>Địa chỉ: {storeInfo.address}</li>
                    <li>Số điện thoại: <a href={"tel:" + storeInfo.phoneNumber} className="text-white">{storeInfo.phoneNumber}</a></li>
                    <li>
                      Email:{" "}
                      <a href={"mailto:" + storeInfo.email}>
                        {storeInfo.email}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="opening-time">
                  <h4>Giờ mở cửa</h4>
                  <div className="opening-content">
                    <ul>
                      <li>{storeInfo.openTime}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom black-bg-2 pb-25 pt-25">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="copyright text-center">
                  <p>
                    Copyright ©{" "}
                    <Link href="/">
                      <a>{storeInfo.storeName}</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {isShowMaps ? (
        <div className="modal_maps fadein">
          <div className="modal_content">
            <span
              className="btn btn_maps_close p-1"
              onClick={() => setIsShowMaps(false)}
            >
              <i
                className="fa fa-times-circle fa-2x text-primary"
                aria-hidden="true"
              ></i>
            </span>
            <div
              className="maps_wraper"
              dangerouslySetInnerHTML={{ __html: storeInfo.maps }}
            ></div>
          </div>
        </div>
      ) : null}
    </>
  );
}
