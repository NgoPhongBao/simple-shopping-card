import React, { useState, useRef } from "react";
import { Button, Card, Input, Select } from "antd";
import useGetHeight from "../../hook/useGetHeight";
import bannerType from "./bannerTypeConst";

import {
  PlusOutlined,
  MinusOutlined,
  SearchOutlined,
  UndoOutlined,
} from "@ant-design/icons";

const { Option } = Select;

export default function Search(props) {
  const { query, setQuery, getListBanner } = props;
  const [isShowSearch, setIsShowSearch] = useState(true);
  const cardContentRef = useRef(null);
  const heightRef = useGetHeight(cardContentRef);

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
                Chọn loại banner
              </label>
              <Select
                  value={query.bannerType || null}
                  className="w-full"
                  id="bannerType"
                  onChange={(value) => {
                    setQuery({
                      ...query,
                      pageIndex: 1,
                      bannerType: value,
                    });
                  }}
                  placeholder="Chọn loại banner"
                  disabled={props.isDetail}
                  allowClear
                >
                  {bannerType.map((el) => {
                    return (
                      <Select.Option value={el.key} key={el.key}>
                        {el.name}
                      </Select.Option>
                    );
                  })}
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
            <div className="md:col-span-2">
              <label className="mb-1 none md:inline-block"></label>
              <div className="flex justify-center sm:justify-end flex-wrap">
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  className="bg-blue-6 hover:bg-blue-4 focus:bg-blue-6 border-0 rounded-xs flex items-center m-1 sm:mr-1 "
                  onClick={() => getListBanner(query)}
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
                      bannerType: "",
                      enable: 1,
                    };
                    getListBanner(_query);
                    setQuery(_query);
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
