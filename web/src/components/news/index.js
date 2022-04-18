import React from "react";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function News(props) {
  const { newsData = {} } = props;
  const { newsTitle, newsDescription, content, url } = newsData;
  return (
    <>
      <Breadcrumb
        breadcrumb={[
          { url: "blog", name: "Blog" },
          { url: url, name: newsTitle },
        ]}
      />
      <div className="blog-area pt-65 pb-65">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="blog-details-wrapper">
                <div
                  className="single-blog-wrapper"
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
