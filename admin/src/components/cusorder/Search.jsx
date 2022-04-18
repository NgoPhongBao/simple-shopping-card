import React, { useState, useRef } from "react";
import { Button, Card, Input, Select } from "antd";
import useGetHeight from "../../hook/useGetHeight";
import constStatus from "../cusorder/status.const.js";

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="mb-1 inline-block" htmlFor="keyword">
                Nhập từ khóa
              </label>
              <Input
                placeholder="Nhập tên khách hàng / số điện thoại"
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
                Trạng thái đơn hàng
              </label>
              <Select
                value={query.status}
                className="w-full"
                id="active"
                onChange={(value) => {
                  setQuery({
                    ...query,
                    pageIndex: 1,
                    status: value,
                  });
                }}
                placeholder="Trạng thái"
              >
                <Select.Option value={null}>Tất cả</Select.Option>
                {constStatus.map((el) => (
                  <Select.Option value={el.value} key={el.value}>
                    {el.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="">
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
