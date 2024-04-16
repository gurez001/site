import { Button } from "@material-ui/core";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const SortProductFilter = ({ setFilter, filter }) => {
  return (
    <>
      <div
        style={{ marginBottom: 20 }}
        className="product-toolbox row col-md-12"
      >
        {filter ? (
          <Button onClick={() => setFilter(!filter)} className="filter">
            Filter
            <IoIosArrowRoundBack className="filter-arrow" />
          </Button>
        ) : null}
        <div
          style={{ gap: 10, alignItems: "center" }}
          className="left-toolbox row col-md-6"
        >
          <div className="col-md-3">
            <p style={{ fontWeight: 600, fontSize: "13px" }}>SORT BY :</p>
          </div>
          <div className="col-md-5">
            <select className="xsm-font-size">
              <option value="Default sorting">Default sorting</option>
              <option value={"Sort by popularity"}>Sort by popularity</option>
              <option value={"Sort by average rating"}>
                Sort by average rating
              </option>
              <option value={"Sort by latest"}>Sort by latest</option>
              <option value={"Sort by price: low to high"}>
                Sort by price: low to high
              </option>
              <option value={"Sort by price: high to low"}>
                Sort by price: high to low
              </option>
            </select>
          </div>
        </div>
        <div
          style={{ justifyContent: "end" }}
          className="right-toolbox row col-md-6"
        >
          <div
            style={{ gap: 10, alignItems: "center", justifyContent: "end" }}
            className="product-toolbox-show-count row col-md-3"
          >
            <div className="col-md-3">
              <p style={{ fontWeight: 600, fontSize: "13px" }}>SHOW :</p>
            </div>
            <div className="col-md-3">
              <select className="xsm-font-size">
                <option value={9}>9</option>
                <option value={12}>12 </option>
                <option value={24}>24</option>
                <option value={36}>36</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SortProductFilter;
