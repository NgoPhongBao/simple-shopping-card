import Link from "next/link";
import React from "react";

export default function Breadcrumb(prop) {
  const { breadcrumb = [] } = prop;
  return (
    <div className="breadcrumb-area gray-bg-7">
      <div className="container">
        <div className="breadcrumb-content">
          <ul>
            <li>
              <Link href="/">
                <a>Trang chủ</a>
              </Link>
            </li>
            {breadcrumb.map((el) => {
              return (
                <li key={el.url}>
                  <Link href={"/" + el.url}>
                    <a>{el.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
