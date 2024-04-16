import React, { useEffect, useState } from "react";
import ProductCard from "../../home/assets/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getCategorie } from "../../../actions/ProductAction";
import Loader from "../../layout/loader/Loader";
import ProductAnimation from "../../layout/loader/ProductAnimation";

const RelatedProducts = ({ product }) => {
  const dispatch = useDispatch();
  const { loding, products } = useSelector((state) => state.catProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [ratings, setRatings] = useState(0);
  const id = product && product._id;
  const catId =
    product &&
    product.product_category &&
    product.product_category[0] &&
    product.product_category._id;

  const filterData =
    products && products.filter((item) => item.productstatus === "Active");

  const shuffleArray = (array) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const randomFilteredData = shuffleArray(filterData);

  useEffect(() => {
    dispatch(getCategorie(currentPage, price, catId, ratings));
  }, [dispatch, currentPage, price, ratings]);

  return (
    <section id="homepage" className="section-cont">
      <div className="coll-title">
        <h2>Related Products</h2>
      </div>
      <div id="prod-cont" className="prod-cont cont-area-h">
        <div className="row flex-wrap">
          {loding
            ? randomFilteredData &&
            randomFilteredData.map((item, i) => <ProductAnimation key={i} />)
            : randomFilteredData &&
              randomFilteredData
                .slice(0, 5)
                .filter((item) => item._id !== id)
                .map((product, i) => (
                  <div className="card-col prod-collem" key={i}>
                    {loding ? <Loader /> : <ProductCard product={product} />}
                  </div>
                ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
