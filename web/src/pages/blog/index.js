import React, { useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Pagination } from "antd";
import Link from "next/link";
import api from "../../service/apiService";
import { useRouter } from "next/router";

export default function News(props) {
  const { newsData = {} } = props;
  const { items = [], totalItems = 0 } = newsData;
  const router = useRouter();

  const [query, setQuery] = useState({
    pageSize: 6,
    pageIndex: 1,
  });

  const getNews = (query) => {
    setQuery(query);
    router.push(
      {
        pathname: "/blog",
        query: { ...query },
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <>
      <Breadcrumb breadcrumb={[{ url: "blog", name: "Blog" }]} />
      <div className="blog-area pt-65 pb-65 fadein">
        <div className="container">
          <div className="row">
            {items.map((el) => {
              return (
                <div className="col-lg-4 col-md-6 col-12" key={el.newsId}>
                  <div className="blog-wrapper mb-30 main-blog">
                    <div className="blog-img mb-20">
                      <Link href={el.url}>
                        <a>
                          <img src={el.imageUrl} alt={el.newsTitle} />
                        </a>
                      </Link>
                    </div>
                    <h3>
                      <Link href={el.url}>
                        <a>{el.newsTitle}</a>
                      </Link>
                    </h3>
                    <p>{el.newsDescription}</p>
                    <div className="blog-meta-bundle">
                      <div className="d-flex justify-content-between">
                        <span>{el.createdDate}</span>
                        <Link href={el.url}>
                          <a className="h6 text-primary">
                            Xem thêm <i className="fa fa-angle-double-right" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row">
            <div className="col-12">
              <div className="pagination-total-pages">
                {items.length ? (
                  <div className="pagination_cus">
                    <Pagination
                      current={query.pageIndex}
                      pageSize={query.pageSize}
                      total={totalItems}
                      onChange={(page, pageSize) => {
                        getNews({ ...query, pageIndex: page });
                      }}
                    />
                  </div>
                ) : null}
                <div className="total-pages">
                  <p>
                    Hiển thị{" "}
                    {(query.pageIndex - 1) * query.pageSize +
                      (items.length ? 1 : 0)}{" "}
                    - {(query.pageIndex - 1) * query.pageSize + items.length}{" "}
                    của {totalItems} kết quả{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const newsRes = await api.get(
      "/news",
      Object.assign(
        {
          pageSize: 6,
          pageIndex: 1,
        },
        query
      )
    );
    return {
      props: {
        newsData: newsRes.data || {},
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
