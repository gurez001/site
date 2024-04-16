import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../../layout/loader/Loader";
import { server_url } from "../../../../utils/Url";

const Bestselling = () => {
  const { products } = useSelector((state) => state.products);
  const { loading, product } = useSelector((state) => state.productFeature);

  let topProduct = [];
  products &&
    products.forEach((item, i) => {
      // if(item._id === product&& Number(product[0].productId))
      if (item._id === Number(product && product[0] && product[0].productId)) {
        topProduct.push(item);
      }
    });



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {topProduct &&
            topProduct.slice(0, 3).map((item, i) => (
              <div key={i} className="desktop-grid-4-card">
                <h2>Day of the product</h2>
                <div>
                  <NavLink to={`/shop/${item.category}/${item.slug}`}>
                    <img
                      src={`${server_url()}/${item.product_images[0].path}`}
                      alt="item"
                    />
                    <span>View now</span>
                  </NavLink>
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default Bestselling;
