import React from "react";

const General = ({  inputValue,handleChange,handleSubmit }) => {
  // const generalPrice = (e, position, state) => {
  //   const { value } = e.target;
  //   const numericValue = parseInt(value);

  //   // setGeneralPrice((prevPrices) => {
  //   //   if (!prevPrices) {
  //   //     prevPrices = [];
  //   //   }
  //   //   const updatedPrices = [...prevPrices] || [];
  //   //   updatedPrices[position] = {
  //   //     [position === 0 ? "regular_price" : "sale_price"]:
  //   //       numericValue && numericValue,
  //   //   };
  //   //   return updatedPrices;
  //   // });
  // };

  return (
    <>
      <div className="tab-general">
        <div className="tab-left">
          <label htmlFor="regularprice">Regular price</label>
        </div>
        <div className="tab-right">
          <input
            type="text"
            name="product_regular_price"
            value={inputValue. product_regular_price}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="tab-general">
        <div className="tab-left">
          <label htmlFor="saleprice">Sale price</label>
        </div>
        <div className="tab-right">
          <input
            type="text"
            id="saleprice"
            name="product_sale_price"
        value={inputValue.product_sale_price}
        onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default General;
