import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Asidebar from "../../layout/aside/Asidebar";
import { Paginations } from "../../../utils/Paginations";
import ProductContainor from "../ProductContainor";

const SubCategory = () => {
  // const { shop } = useParams();
  const [is_valid, set_is_valid] = useState(true);
  const [filter, setFilter] = useState(false);
  const { productsCount, products, resultPerPage } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

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

  return (
    <>
      {" "}
      <>
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
              set_is_valid={set_is_valid}
              currentPage={currentPage}
            />
            <ProductContainor setFilter={setFilter} filter={filter} />
          </div>
        </div>
      </>
      {resultPerPage < productsCount &&(
        <Paginations
          totalItemsCount={productsCount}
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          handlePageChange={setCurrentPageNo}
        />
      )}
    </>
  );
};
export default SubCategory;
