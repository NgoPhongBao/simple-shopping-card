import Slider from "react-slick";
import Link from "next/link";
import { formatPrice } from "../../utils";
import { getContext } from "../../context";
import { toast } from "react-toastify";

export default function ProductCard(props) {
  const { data = {} } = props;
  const { cart, setCart } = getContext();
  const {
    productId = null,
    productName = "",
    productCategoryName = "",
    brandName = "",
    shortDescription = "",
    price = 0,
    url = "",
    images = [],
  } = data;

  const addToCart = (product) => {
    const _cart = [...cart];
    const index = _cart.findIndex((el) => el.productId === product.productId);
    if (index >= 0) {
      _cart[index].number = _cart[index].number + 1;
    } else {
      product.number = 1;
      _cart.push(product);
    }
    setCart(_cart);
    localStorage.setItem("cart", JSON.stringify(_cart));
    toast.success("Đã thêm sản phẩm vào giỏ hàng", { hideProgressBar: true });
  };

  return (
    <div className="devita-product-2 mrg-inherit product_card pb-4">
      <div className="product-img">
        <div className="product-img-slider">
          {
            <Slider arrows={true} infinite={false}>
              {images.map((el) => {
                return (
                  <Link href={"/" + url} key={el}>
                    <a>
                      <img src={el} alt={productName} />
                    </a>
                  </Link>
                );
              })}
            </Slider>
          }
        </div>
      </div>
      <div className="product_card_content mt-2">
        <div className="text-center px-3">
          <span className="category_name">
            {brandName
              ? `${productCategoryName}, ${brandName}`
              : productCategoryName}
          </span>
          <h4 className="mt-2">
            <Link href={url}>
              <a>{productName}</a>
            </Link>
          </h4>
          <div className="product-price-wrapper">
            <span>{formatPrice(price)} đ</span>
          </div>
        </div>
      </div>
      <div className="product_card_action">
        <p className="p-2 text-center m-0">
          {
            shortDescription && shortDescription.length > 100 ? shortDescription.substring(0, 99) + "..." : shortDescription
          }
        </p>
        <div className="product-action">
          <a
            className="action-cart"
            title="Thêm vào giỏ hàng"
            onClick={() => addToCart(data)}
            style={{ cursor: "pointer" }}
          >
            Thêm vào giỏ hàng
          </a>
        </div>
      </div>
    </div>
  );
}
