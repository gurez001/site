import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Asidebar from "../../layout/aside/Asidebar";
import { Paginations } from "../../../utils/Paginations";
import ProductContainor from "../ProductContainor";
import { useParams } from "react-router-dom";
import ErrorPage from "../../404Page/ErrorPage";

const Category = () => {
  const { category } = useParams();
  const [filter, setFilter] = useState(false);
  const { resultPerPage, productsCount, products } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const { allcategroes } = useSelector((state) => state.allCategroe);
  const filter_category =
    allcategroes && allcategroes.filter((item) => item.slug === category);

  useEffect(() => {
    const handleResize = () => {
      setFilter(window.innerWidth < 980 ? true : false);
    };
    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
console.log(filter_category.length)
  return (
    <>
      {/* {filter_category.length === 0 ? (
        <ErrorPage />
      ) : (
        <> */}
          <div className="product-cont-row shop-page product-page--">
            <div
              id="prod-cont"
              className={`${
                filter
                  ? "prod-cont cont-area-h full-width"
                  : "prod-cont cont-area-h"
              }`}
            >
              <Asidebar
                setFilter={setFilter}
                filter={filter}
                currentPage={currentPage}
              />
              <ProductContainor setFilter={setFilter} filter={filter} />
            </div>
          </div>

          {resultPerPage < productsCount && (
            <Paginations
              totalItemsCount={productsCount}
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              handlePageChange={setCurrentPageNo}
            />
          )}
        </>
    //   )}
    // </>
  );
};

export default Category;
