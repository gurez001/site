import React, { useEffect, useState } from "react";
import MyEditor from "../../productUpdateform/classiceditor/MyEditor";
import ProductTab from "../ProductTab";

const UpdateForm = ({
  inputValue,
  handleChange,
  handleSubmit,
  descriptionHeandle,
  shortdesHeandle,
  article,
  content,

  Variations,
  setVariations,
}) => {
  return (
    <>
      <form>
        <div>
          <label>Product Title</label>
          <input
            type="text"
            placeholder="Product Name"
            name="title"
            value={inputValue.title}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div>
          <label>Product Short Description</label>
          <MyEditor valuedata={content} getData={shortdesHeandle} />
        </div>
        <div>
          <label>Product Description</label>
          <MyEditor valuedata={article} getData={descriptionHeandle} />
        </div>
      </form>

      <div className="attribute-tab">
        <ProductTab
          inputValue={inputValue}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          Variations={Variations}
          setVariations={setVariations}
          // setProductType={setProductType}
          // setProduct_regular_price={setProduct_regular_price}
          // setProduct_sale_price={setProduct_sale_price}
          // setSKU={setSKU}
          // setStock={setStock}
          // setSold_Individually={setSold_Individually}
          // setAvailability_Date={setAvailability_Date}
          // setWeight={setWeight}
          // setDimensions={setDimensions}
          // setShipping_class={setShipping_class}
          // setVariations={setVariations}
          // setDefault_value={setDefault_value}
        />
      </div>
    </>
  );
};

export default UpdateForm;
