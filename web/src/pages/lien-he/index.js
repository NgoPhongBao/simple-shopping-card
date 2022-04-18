import React, { useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function Contact(props) {
  const { storeInfo = {} } = props;
  const { address, phoneNumber, maps, email } = storeInfo;

  const [tabActive, setTabActive] = useState("info");

  return (
    <>
      <Breadcrumb breadcrumb={[{ url: "lien-he", name: "Liên hệ" }]} />
      <div className="contact-us pt-60 pb-50 fadein">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contact-page-title mb-40">
                <h1>
                  Xin chào!
                  <br /> Hãy liên hệ với chúng tôi
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <ul className="contact-tab-list nav">
                <li>
                  <a
                    className={`btn ${tabActive === "info" ? "active" : ""}`}
                    onClick={() => setTabActive("info")}
                  >
                    <i className="fa fa-hand-o-right" aria-hidden="true"></i>{" "}
                    Thông tin liên hệ
                  </a>
                </li>
                <li>
                  <a
                    className={`btn ${
                      tabActive === "contact-form" ? "active" : ""
                    }`}
                    onClick={() => setTabActive("contact-form")}
                  >
                    <i className="fa fa-hand-o-right" aria-hidden="true"></i> Để
                    lại lời nhắn
                  </a>
                </li>
                <li>
                  <a
                    className={`btn ${tabActive === "maps" ? "active" : ""}`}
                    onClick={() => setTabActive("maps")}
                  >
                    <i className="fa fa-hand-o-right" aria-hidden="true"></i>{" "}
                    Xem bản đồ
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-8">
              <div className="tab-content tab-content-contact">
                <div
                  className={`tab-pane fade row d-flex ${
                    tabActive === "info" ? "active show" : ""
                  }`}
                >
                  <div className="col-lg-4 col-md-4">
                    <div className="contact-information">
                      <h4>Địa chỉ</h4>
                      <p>{address}</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="contact-information mrg-top-sm">
                      <h4>Số điện thoại</h4>
                      <p>
                        <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="contact-information mrg-top-sm">
                      <h4>Địa chỉ email</h4>
                      <p>
                        <a href={`mailto:${email}`}>{email}</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`tab-pane fade row d-flex ${
                    tabActive === "contact-form" ? "active show" : ""
                  }`}
                >
                  <div className="col">
                    <form id="contact-form">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="contact-form-style mb-20">
                            <input
                              name="name"
                              placeholder="Tên của bạn"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="contact-form-style mb-20">
                            <input
                              name="phoneNumber"
                              placeholder="Số điện thoại"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="contact-form-style">
                            <textarea
                              name="message"
                              placeholder="Nội dung"
                              defaultValue={""}
                            />
                            <button
                              className="submit"
                              type="submit"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              Gửi lời nhắn
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <p className="form-messege" />
                  </div>
                </div>
                <div
                  className={`tab-pane fade row d-flex ${
                    tabActive === "maps" ? "active show" : ""
                  }`}
                >
                  <div className="col-12">
                    <div className="contact-map">
                      <div
                        id="map"
                        dangerouslySetInnerHTML={{ __html: maps }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
