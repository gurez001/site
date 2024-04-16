import React, { useEffect, useState, memo } from "react";
import FilterPrice from "./FilterPrice";
import Categories from "./Categories";
import RatingsFilter from "./RatingsFilter";
import "./style.css";
import ClearFilter from "./ClearFilter";
import { Button } from "@material-ui/core";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getProduct } from "../../../actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Asidebar = ({ setFilter, filter, currentPage }) => {
  const [price, setPrice] = useState([0, 1000]);
  const dispatch = useDispatch();
  const { category, subcategory } = useParams();

  const { allcategroes } = useSelector((state) => state.allCategroe);
  const { all_sub_categores } = useSelector((state) => state.sub_Categore);

  const filter_category =
    allcategroes && allcategroes.filter((item) => item.slug === category);
  const filter_sub_category =
    all_sub_categores &&
    all_sub_categores.filter((item) => item.slug === subcategory);
  const cat_id =
    filter_category && filter_category[0] && filter_category[0]._id;
  const sub_cat_id =
    filter_sub_category && filter_sub_category[0] && filter_sub_category[0]._id;

  const clearFilterHeandler = (e) => {
    // setCurrentPage(1);
    // setPrice([0, 1000]);
    // setCategories("");
    // setRatings(0);
    // setClearFilter(true);
    // setsideBarActive(false);
  };

  //current price
  const priceHeandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(
      getProduct(currentPage, price, cat_id && cat_id, sub_cat_id && sub_cat_id)
    );
  }, [currentPage, price, cat_id, sub_cat_id]);

  return (
    <>
      <aside>
        <div className="sidebar-cont">
          <div className="side-bar">
            {/* {catLoading ? (
                    <AsideAnimation />
                  ) : ( */}
            <div className="aside-filter aside-hr">
              <div className="inner-aside-filter">
                <Button onClick={() => setFilter(!filter)} className="filter">
                  Filter
                  <IoIosArrowRoundBack className="filter-arrow" />
                </Button>

                <Button
                  style={{
                    marginTop: 5,
                    fontWeight: 600,
                    fontSize: "13px",
                    width: "130px",
                  }}
                  onClick={() => clearFilterHeandler()}
                >
                  Clean All
                </Button>
              </div>
            </div>
            <div className="mob--cont">
              <div className="aside-price-categories aside-hr">
                <Categories />
              </div>
              <div className="aside-price-filter aside-hr">
                <FilterPrice price={price} inputevent={priceHeandler} />
              </div>
              {/* <RatingsFilter ratingsHeandle={ratingsHeandle} ratings={ratings} /> */}
              {/* <ClearFilter
          clearFilterHeandler={clearFilterHeandler}
          clearFilter={clearFilter}
        /> */}
            </div>
            {/* )} */}
          </div>
        </div>
      </aside>
    </>
  );
};

export default memo(Asidebar);
