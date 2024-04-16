import React from "react";
import Cards2 from "./Cards/Cards2";

const PopularProduct = ({ products }) => {
  return (
    <>
      <div className="title">
        <h2>Popular Products</h2>
      </div>
      {products &&
        products
          .slice(0, 5)
          .filter((item) => item.productstatus === 'Active')
          .map((product, i) => (
            <div key={i}>
              <Cards2 key={product._id} product={product} />
            </div>
          ))}
    </>
  );
};

export default PopularProduct;
