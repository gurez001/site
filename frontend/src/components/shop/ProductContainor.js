import React, { useEffect, useState,memo } from "react";
import SortProductFilter from "../../utils/SortProductFilter";
import { useSelector } from "react-redux";
import ProductCard from "../home/assets/ProductCard";
import ProductAnimation from "../layout/loader/ProductAnimation";

const ProductContainor = ({ setFilter, filter }) => {
  const { loding, products } = useSelector((state) => state.products);
  const [loader, set_loader] = useState(true);
  const length = [1,2,3,4,5,6,7,8,9]
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      set_loader(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
    
  }, []);

 
  return (
    <>
      <div className="main-content-product product-containor">
        <SortProductFilter setFilter={setFilter} filter={filter} />
        <div className="row flex-wrap">
          {loding ? (
            length && length.map((item, i) => <ProductAnimation key={i} />)
          ) : (
            <>
              {products &&
                products
                  .filter((item) => item.productstatus === "Active")
                  .map((product, i) => (
                    <div key={i} className="card-col">
                      <ProductCard product={product} />
                    </div>
                  ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(ProductContainor);
