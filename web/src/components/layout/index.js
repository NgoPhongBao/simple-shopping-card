import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";

export default function Layout(props) {
  const { children, storeInfo = {}, productCategoryMenu = [] } = props;
  return (
    <>
      <Header storeInfo={storeInfo} productCategoryMenu={productCategoryMenu} />
      {children}
      <Footer storeInfo={storeInfo} />
      <ToastContainer
        pauseOnHover={false}
        hideProgressBar={true}
        autoClose={1500}
      />
    </>
  );
}
