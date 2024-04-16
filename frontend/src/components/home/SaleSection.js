import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import LatestProducts from "./assets/LatestProducts";
import ReviewAnimation from "../layout/loader/ReviewAnimation";

const SaleSection = () => {
  const { loding, products } = useSelector((state) => state.products);

  const length = [1, 2, 3, 4];
  return (
    <>
      <section id="homepage" className="section-cont ">
        <div className=" prod-cont cont-area-h  sell-div">
          <div className="Latest-content">
            <h3 style={{ marginBottom: "20px" }}>Sale Products</h3>
            {loding ? (
              length.map((item, i) => <ReviewAnimation key={i} />)
            ) : (
              <LatestProducts products={products} />
            )}
          </div>
          <div className="Latest-content">
            {" "}
            <h3 style={{ marginBottom: "20px" }}>Latest Products</h3>
            {loding ? (
              length.map((item, i) => <ReviewAnimation key={i} />)
            ) : (
              <LatestProducts products={products} />
            )}
          </div>
          <div className="Latest-content">
            <h3 style={{ marginBottom: "20px" }}>Best of the Week</h3>{" "}
            {loding ? (
              length.map((item, i) => <ReviewAnimation key={i} />)
            ) : (
              <LatestProducts products={products} />
            )}
          </div>
          <div className="Latest-content">
            <h3 style={{ marginBottom: "20px" }}>Popular</h3>{" "}
            {loding ? (
              length.map((item, i) => <ReviewAnimation key={i} />)
            ) : (
              <LatestProducts products={products} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SaleSection;
