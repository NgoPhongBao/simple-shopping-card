import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import DefaultLayout from "./layout";
import Dashboard from "./components/dashboard/Dashboard";

// News
import News from "./components/news";
import NewsAdd from "./components/news/NewsAdd";
import NewsDetail from "./components/news/NewsDetail";
import NewsEdit from "./components/news/NewsEdit";

// Seo page
import SeoPage from "./components/seo-page";

// Store
import Store from "./components/store";

// User
import User from "./components/user";
import UserAdd from "./components/user/UserAdd";
import UserDetail from "./components/user/UserDetail";
import UserEdit from "./components/user/UserEdit";

// Permission
import Permission from "./components/permission";
import PermissionAdd from "./components/permission/Add";
import PermissionDetail from "./components/permission/Detail";
import PermissionEdit from "./components/permission/Edit";

// Permission Group
import PermissionGroup from "./components/permission-group";
import PermissionGroupAdd from "./components/permission-group/Add";
import PermissionGroupDetail from "./components/permission-group/Detail";
import PermissionGroupEdit from "./components/permission-group/Edit";

//ProductCategory
import ProductCategory from "./components/product-category";
import ProductCategoryAdd from "./components/product-category/Add";
import ProductCategoryDetail from "./components/product-category/Detail";
import ProductCategoryEdit from "./components/product-category/Edit";

// Banner
import Banner from "./components/banner";
import BannerAdd from "./components/banner/BannerAdd";
import BannerDetail from "./components/banner/BannerDetail";
import BannerEdit from "./components/banner/BannerEdit";

// Product
import Product from "./components/product";
import ProductAdd from "./components/product/Add";
import ProductDetail from "./components/product/Detail";
import ProductEdit from "./components/product/Edit";

// Brand
import Brand from "./components/brand";
import BrandAdd from "./components/brand/Add";
import BrandDetail from "./components/brand/Detail";
import BrandEdit from "./components/brand/Edit";

// About
import About from "./components/about";

// Order
import CusOrder from "./components/cusorder";
import CusOrderEdit from "./components/cusorder/Edit";

// Attribute
import Attribute from "./components/attribute";
import AttributeAdd from "./components/attribute/Add";
import AttributeDetail from "./components/attribute/Detail";
import AttributeEdit from "./components/attribute/Edit";



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
         
          <Route path="/404" element={<Page404 />} />

          {/* news */}
          <Route path="/news" element={<News />} />
          <Route path="/news/add" element={<NewsAdd />} />
          <Route path="/news/detail/:newsId" element={<NewsDetail />} />
          <Route path="/news/edit/:newsId" element={<NewsEdit />} />

          {/* seo page */}
          <Route path="/seo-page" element={<SeoPage />} />

          {/* store */}
          <Route path="/store" element={<Store />} />

          {/* user */}
          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<UserAdd />} />
          <Route path="/user/detail/:userId" element={<UserDetail />} />
          <Route path="/user/edit/:userId" element={<UserEdit />} />

          {/* permission */}
          <Route path="/permission" element={<Permission />} />
          <Route path="/permission/add" element={<PermissionAdd />} />
          <Route path="/permission/detail/:permissionId" element={<PermissionDetail />} />
          <Route path="/permission/edit/:permissionId" element={<PermissionEdit />} />

          {/* permission group*/}
          <Route path="/permission-group" element={<PermissionGroup />} />
          <Route path="/permission-group/add" element={<PermissionGroupAdd />} />
          <Route path="/permission-group/detail/:permissionGroupId" element={<PermissionGroupDetail />} />
          <Route path="/permission-group/edit/:permissionGroupId" element={<PermissionGroupEdit />} />

          {/* product category */}
          <Route path="/product-category" element={<ProductCategory />} />
          <Route path="/product-category/add" element={<ProductCategoryAdd />} />
          <Route path="/product-category/detail/:id" element={<ProductCategoryDetail />} />
          <Route path="/product-category/edit/:id" element={<ProductCategoryEdit />} />

         {/* banner */}
          <Route path="/banner" element={<Banner />} />
          <Route path="/banner/add" element={<BannerAdd />} />
          <Route path="/banner/detail/:bannerId" element={<BannerDetail />} />
          <Route path="/banner/edit/:bannerId" element={<BannerEdit />} />

          {/* product */}
          <Route path="/product" element={<Product />} />
          <Route path="/product/add" element={<ProductAdd />} />
          <Route path="/product/detail/:id" element={<ProductDetail />} />
          <Route path="/product/edit/:id" element={<ProductEdit />} />

          {/* brand */}
          <Route path="/brand" element={<Brand />} />
          <Route path="/brand/add" element={<BrandAdd />} />
          <Route path="/brand/detail/:id" element={<BrandDetail />} />
          <Route path="/brand/edit/:id" element={<BrandEdit />} />

          {/* About */}
          <Route path="/about" element={<About />} />

          {/* Order */}
          <Route path="/cusorder" element={<CusOrder />} />
          <Route path="/cusorder/edit/:id" element={<CusOrderEdit />} />

           {/* attribute */}
           <Route path="/attribute" element={<Attribute />} />
          <Route path="/attribute/add" element={<AttributeAdd />} />
          <Route path="/attribute/detail/:id" element={<AttributeDetail />} />
          <Route path="/attribute/edit/:id" element={<AttributeEdit />} />

          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
