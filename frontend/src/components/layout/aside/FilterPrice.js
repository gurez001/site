import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Currency from "../currency/Currency";

const FilterPrice = ({ inputevent, price }) => {
  const [is_visiable_cat_list, set_is_visiable_cat_list] = useState(true);
  return (
    <>
      <h3 className="col-md-12 row space-between-center cate-header">
        <span className="col-md-10">Filter by Price</span>
        <span className="col-md-3">
          {is_visiable_cat_list ? (
            <FaMinus
              style={{ cursor: "pointer" }}
              onClick={() => set_is_visiable_cat_list(false)}
            />
          ) : (
            <FaPlus
              style={{ cursor: "pointer" }}
              onClick={() => set_is_visiable_cat_list(true)}
            />
          )}
        </span>
      </h3>
      <div
        className="category-list"
        style={is_visiable_cat_list ? { height: "auto" } : { height: 0 }}
      >
        <div className="price-filter-cont">
          <p>
            <span>Price</span>{" "}
            <span>
              {" "}
              <Currency price={price[0]} />{" "}
            </span>
            <span>
              <FaMinus style={{ paddingTop: 5 }} />
            </span>
            <span>
              <Currency price={price[1]} />
            </span>
          </p>
        </div>
        <Slider
          value={price}
          onChange={inputevent}
          valueLabelDisplay="off"
          aria-labelledby="range-slider"
          min={0}
          max={1000}
          //  style={sliderStyles}
        />
      </div>
    </>
  );
};

export default FilterPrice;
