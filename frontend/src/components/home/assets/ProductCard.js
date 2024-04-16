import { Link, NavLink } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { addItemsToCart } from "../../../actions/cartAction";
import { useDispatch } from "react-redux";
import LazyLoadImages from "../../layout/lazyload/LazyLoadImages";
import { CiHeart } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import { useAlert } from "react-alert";
import {
  wishListAction,
  CreateBookmarkAction,
} from "../../../actions/wishListAction";
import Currency from "../../layout/currency/Currency";
import { useState } from "react";
import QuickView from "./producquickview/QuickView";
import { v4 as uuidv4, v4 } from "uuid";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const options = {
    value: product && product.product_ratings_average,
    precision: 0.5,
    size: "medium",
    readOnly: true,
  };

  const [quickOpen, setQuickOpen] = useState(false);
  const productId = product._id;

  const buyNow = (id, quentity) => {
    dispatch(addItemsToCart(id, quentity));
    alert.success("Item Added to Cart");
    // Navigate("/cart");
  };

  const date = new Date(String(product.createdate).substr(0, 10));
  const currentDate = new Date();
  const timeDifferent = Math.abs(currentDate - date);

  const wishlist_product_uuid = uuidv4();
  const wishlist_product_id = product._id;

  const addToWishtHandler = (id, price) => {
    dispatch(wishListAction(id, price));
    dispatch(CreateBookmarkAction(wishlist_product_id, wishlist_product_uuid));
    alert.success("Item Added to Wishlist");
  };

  return (
    <>
      {quickOpen && (
        <QuickView productId={productId} setQuickOpen={setQuickOpen} />
      )}
      <div className="product-card">
        <div className="product-card-row">
          <div className="prod-img-cont">
            <div className="prod-card-img">
              {product &&
              product.product_images &&
              product.product_images.length > 0 ? (
                <LazyLoadImages
                  product={
                    product &&
                    product.product_images &&
                    product.product_images[0]
                  }
                />
              ) : (
                <img src="/courrgated-box-2.webp" alt="ss" />
              )}
              <div className="prod-wish">
                <p onClick={() => setQuickOpen(true)}>Quick View</p>
              </div>
              <div className="prod-cart">
                <IoBagCheckOutline
                  onClick={() => buyNow(product._id && product._id, 1)}
                />
              </div>
              <div className="prod-wishs">
                <CiHeart
                  onClick={() =>
                    addToWishtHandler(
                      product._id && product._id,
                      product.product_sale_price
                    )
                  }
                />
              </div>
            </div>
            <div className="product-discount">
              {product.product_regular_price ? (
                <span>
                  {Math.abs(
                    (
                      ((product.product_sale_price -
                        product.product_regular_price) /
                        product.product_regular_price) *
                      100
                    ).toFixed(1)
                  )}
                  % OFF
                </span>
              ) : null}
            </div>

            <div className="product-nO">
              {Math.floor(timeDifferent / (1000 * 60 * 60 * 24)) < 15 ? (
                <span>new</span>
              ) : null}
            </div>
          </div>
          <div className="product-details">
            <div className="product-cat space-set">
              <p>
                {product.product_subcategory &&
                  product.product_subcategory.map((item, i) => (
                    <span key={i}>
                      <NavLink
                        to={`/product-category/${
                          product.product_category[0] &&
                          product.product_category[0].slug
                        }/${item.slug}`}
                      >
                        {item.name}
                      </NavLink>
                      ,
                    </span>
                  ))}
              </p>
            </div>
            <h3>
              <Link
                className="product-card space-set font-size-cont"
                to={`/product/${product.slug}`}
              >
                {product.product_name.substr(0, 50)}...
              </Link>
            </h3>
            <div className="">
              <p
                style={{
                  gap: 5,
                  justifyContent: "center",
                  fontWeight: 600,
                  color: "#000",
                }}
                className="row"
              >
                <span>
                  <Currency price={product.product_sale_price} />
                </span>
                <span>-</span>
                <span>
                  <del>
                    <Currency price={product.product_regular_price} />
                  </del>
                </span>
              </p>
            </div>
            <div
              style={{ gap: 5, justifyContent: "center", alignItems: "center" }}
              className="row"
            >
              <Rating {...options} />
              <span className="rev-tot">
                (
                {product && product.product_ratings < 1
                  ? "No reviews"
                  : product && product.product_ratings}
                )
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
