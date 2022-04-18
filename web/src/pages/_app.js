import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import "swiper/css";
import "antd/es/slider/style/index.css";
import "antd/es/pagination/style/index.css";
import "../styles/custom.scss";
import Layout from "../components/layout";
import Head from "next/head";
import App from "next/app";
import api from "../service/apiService";
import ContextProviver from "../context";

function MyApp({ Component, pageProps, storeInfo, productCategoryMenu }) {
  return (
    <>
      <Head>
        <title>Điện lạnh Duy Nhất</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ContextProviver>
        <Layout
          storeInfo={storeInfo}
          productCategoryMenu={productCategoryMenu || []}
        >
          <Component {...pageProps} storeInfo={storeInfo} />
        </Layout>
      </ContextProviver>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  try {
    const appProps = await App.getInitialProps(appContext);
    const storeInfoRes = await api.get("/store");
    const storeInfo = storeInfoRes.data;
    const productCategoryMenuRes = await api.get("/product-category/menu");
    const productCategoryMenu = productCategoryMenuRes.data;
    return { ...appProps, storeInfo, productCategoryMenu };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default MyApp;
