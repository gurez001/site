import React from "react";
import { NavLink } from "react-router-dom";
import LazyLoadImages from "../../../layout/lazyload/LazyLoadImages";
import Currency from "../../../layout/currency/Currency";
import { Rating } from "@material-ui/lab";

const Cards2 = ({ product }) => {
  const options = {
    value: product.ratings,
    precision: 0.5,
    size: "medium",
    readOnly: true,
  };

  return (
    <div className="card-containor">
      <div className="product-list-sm">
        <div className="list-sm-img">
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
        </div>
        <div className="list-sm-title">
          <h4 style={{ margin: 0 }}>
            <NavLink style={{ fontWeight: 500,fontSize:16 }} to={`/product/${product && product.slug}`}>
              {" "}
              {product.product_name}
            </NavLink>
          </h4>
          <div>
            <p
              style={{
                fontSize: "14px",
                gap: "5px",
                justifyContent: "center",
                fontWeight: 600,
                color: "rgb(0, 0, 0)",
              }}
            >
              <span>
                <Currency price={product.product_regular_price} />
              </span>
              <span>-</span>
              <span>
                <del>
                  <Currency price={product.product_sale_price} />
                </del>
              </span>
            </p>
          </div>
          <div className="list-sm-rev">
            <Rating {...options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards2;
