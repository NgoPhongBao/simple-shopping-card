import { useState } from "react";
import api from "../../service/apiService";
import ProductCard from "../../components/common/ProductCard";
import { useRouter } from "next/router";
import { Pagination } from "antd";

export default function Product(props) {
  const { productData = {} } = props;
  const { pageSize, pageIndex, keyword, items, totalItems } = productData;
  const router = useRouter();
  const [query, setQuery] = useState({ pageSize, pageIndex, keyword });

  const getProduct = (query) => {
    setQuery(query);
    router.push(
      {
        pathname: "/san-pham",
        query: { ...query },
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <div className="container">
      <p className="my-4">
        <span className="h6">Kết quả tìm kiếm:</span>
        <span> "{keyword}"</span>
      </p>
      <p>
        Hiển thị{" "}
        {(query.pageIndex - 1) * query.pageSize + (items.length ? 1 : 0)} -{" "}
        {(query.pageIndex - 1) * query.pageSize + items.length} của {totalItems}{" "}
        kết quả.{" "}
      </p>
      <div className="row">
        {items.length ? (
          items.map((el) => {
            return (
              <div
                className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb-30 fadein"
                key={el.productId}
              >
                <ProductCard data={el} />
              </div>
            );
          })
        ) : (
          <p className="text-center mt-50 mb-50">Không tìm thấy sản phẩm.</p>
        )}
      </div>
      {items.length ? (
        <div className="pagination-total-pages justify-content-center mb-50">
          <div className="pagination_cus d-flex justify-content-center">
            <Pagination
              current={query.pageIndex}
              pageSize={query.pageSize}
              total={totalItems}
              onChange={(page, pageSize) => {
                getProduct({ ...query, pageIndex: page });
              }}
              className="d-flex justify-content-center"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const productsRes = await api.get(
      `/product`,
      Object.assign(
        {
          pageSize: 8,
          pageIndex: 1,
          keyword: "",
        },
        query
      )
    );
    const productData = productsRes.data;
    return {
      props: {
        productData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
