import React, { useEffect, useState } from "react";
import MyEditor from "../../../layout/classiceditor/MyEditor";
import "../../marketing/coupon/coupon.css";
import ProductTab from "./ProductTab";

const ProductForm = ({
  setTitle,
  setProductType,
  setProduct_sale_price,
  setProduct_regular_price,
  setSKU,
  setStock,
  setSold_Individually,
  setAvailability_Date,
  setWeight,
  setDimensions,
  setShipping_class,
  setVariations,
  descriptionHeandle,
  shortdesHeandle,setDefault_value
}) => {
  return (
    <>
      <form className="form ">
        <div className="spacer col-md-12">
          <label className="spacer xsm-font-size">Product Title</label>
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            onBlur={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div className="spacer col-md-12">
        <label className="spacer xsm-font-size">Product Short Description</label>
          <MyEditor event={shortdesHeandle} />
        </div>
        <div className="spacer col-md-12">
        <label className="spacer xsm-font-size">Product Description</label>
          <MyEditor event={descriptionHeandle} />
        </div>
      </form>

      <div className="attribute-tab">
        <ProductTab
          setProductType={setProductType}
          setProduct_regular_price={setProduct_regular_price}
          setProduct_sale_price={setProduct_sale_price}
          setSKU={setSKU}
          setStock={setStock}
          setSold_Individually={setSold_Individually}
          setAvailability_Date={setAvailability_Date}
          setWeight={setWeight}
          setDimensions={setDimensions}
          setShipping_class={setShipping_class}
          setVariations={setVariations}
          setDefault_value={setDefault_value}
        />
      </div>
    </>
  );
};

export default ProductForm;
