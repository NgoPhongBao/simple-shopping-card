import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Input, Select, message } from "antd";
import useGetHeight from "../../hook/useGetHeight";
import api from "../../service/apiService";
import {
  PlusOutlined,
  MinusOutlined,
  SearchOutlined,
  UndoOutlined,
} from "@ant-design/icons";
const { Option } = Select;

export default function Search(props) {
  const { query, setQuery, getList } = props;
  const [isShowSearch, setIsShowSearch] = useState(true);
  const cardContentRef = useRef(null);
  const heightRef = useGetHeight(cardContentRef);

  const [productCategoryOptions, setProductCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const _brands = await api.get("/brand/all");
      setBrandOptions(_brands.data);
      const _productCategories = await api.get("/product-category/all");
      setProductCategoryOptions(_productCategories.data);
    } catch (error) {
      message.error("Khởi tạo dữ liệu không thành công!");
    }
  };

  return (
    <Card
      size="small"
      title="Thông tin tìm kiếm"
      extra={
        !isShowSearch ? (
          <PlusOutlined
            onClick={() => setIsShowSearch(!isShowSearch)}
            className="text-lg text-white flex items-center"
          />
        ) : (
          <MinusOutlined
            onClick={() => setIsShowSearch(!isShowSearch)}
            className="text-lg text-white flex items-center"
          />
        )
      }
    >
      <div
        ref={cardContentRef}
        className="duration-200 overflow-hidden"
        style={{ height: isShowSearch ? heightRef : "0px" }}
      >
        <div className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="mb-1 inline-block" htmlFor="keyword">
                Nhập từ khóa
              </label>
              <Input
                placeholder="Nhập tên sản phẩm"
                id="keyword"
                value={query.keyword}
                onChange={(e) => {
                  setQuery({
                    ...query,
                    pageIndex: 1,
                    keyword: e.target.value,
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getList(query);
                  }
                }}
              />
            </div>

            <div>
              <label className="mb-1 inline-block" htmlFor="active">
                Danh mục sản phẩm
              </label>
              <Select
                value={query.productCategoryId}
                className="w-full"
                id="active"
                onChange={(value) => {
                  setQuery({
                    ...query,
                    pageIndex: 1,
                    productCategoryId: value,
                  });
                }}
                placeholder="Danh mục sản phẩm"
              >
                <Select.Option value={null}>Tất cả</Select.Option>
                {productCategoryOptions.map((el) => (
                  <Select.Option
                    value={el.productCategoryId}
                    key={el.productCategoryId}
                  >
                    {el.productCategoryName}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1 inline-block" htmlFor="active">
                Thương hiệu
              </label>
              <Select
                value={query.brandId}
                className="w-full"
                id="active"
                onChange={(value) => {
                  setQuery({
                    ...query,
                    pageIndex: 1,
                    brandId: value,
                  });
                }}
                placeholder="Thương hiệu"
              >
                <Select.Option value={null}>Tất cả</Select.Option>
                {brandOptions.map((el) => (
                  <Select.Option value={el.brandId} key={el.brandId}>
                    {el.brandName}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1 inline-block" htmlFor="active">
                Loại sản phẩm
              </label>
              <Select
                value={query.type}
                className="w-full"
                id="active"
                onChange={(value) => {
                  setQuery({
                    ...query,
                    pageIndex: 1,
                    type: value,
                  });
                }}
              >
                <Option value={null}>Tất cả</Option>
                <Option value={1}>Sản phẩm mới</Option>
                <Option value={0}>Sản phẩm bán chạy</Option>
              </Select>
            </div>
            <div>
              <label className="mb-1 inline-block" htmlFor="active">
                Kích hoạt
              </label>
              <Select
                value={query.enable}
                className="w-full"
                id="active"
                onChange={(value) => {
                  setQuery({
                    ...query,
                    pageIndex: 1,
                    enable: value,
                  });
                }}
              >
                <Option value={null}>Tất cả</Option>
                <Option value={1}>Có</Option>
                <Option value={0}>Không</Option>
              </Select>
            </div>
            <div className="md:col-span-3">
              <label className="mb-1 none md:inline-block"></label>
              <div className="flex justify-center sm:justify-end flex-wrap">
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  className="bg-blue-6 hover:bg-blue-4 focus:bg-blue-6 border-0 rounded-xs flex items-center m-1 sm:mr-1 "
                  onClick={() => getList(query)}
                >
                  Tìm kiếm
                </Button>
                <Button
                  type="primary"
                  icon={<UndoOutlined />}
                  className="bg-cyan-6 hover:bg-cyan-4 focus:bg-cyan-6 border-0 rounded-xs flex items-center m-1 sm:mr-0"
                  onClick={() => {
                    const _query = {
                      ...query,
                      pageIndex: 1,
                      keyword: "",
                      enable: 1,
                      productCategoryId: null,
                      brandId: null,
                      typeo: null
                    };
                    getList(_query);
                  }}
                >
                  Làm mới
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
