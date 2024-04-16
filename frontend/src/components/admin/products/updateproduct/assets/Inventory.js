import React from "react";
import { FaHandMiddleFinger } from "react-icons/fa6";

const Inventory = ({ inputValue, handleChange, handleSubmit }) => {
  return (
    <div>
      <div className="tab-general">
        <div className="tab-left">
          <label>SKU</label>
        </div>
        <div className="tab-right">
          <input
            type="number"
            name="SKU"
            value={inputValue.SKU}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="tab-general">
        <div className="tab-left">
          <label>Stock Management</label>
        </div>
        <div className="tab-right">
          <input
            type="checkbox"
            id="stockmanagement"
            name="Stock"
            value={inputValue.Stock}
            checked={inputValue.Stock ? true : false}
            onChange={handleChange}
          />
          <span>Track stock quantity for this product</span>
        </div>
      </div>
      <div></div>
      <div className="tab-general">
        <div className="tab-left">
          <label>Sold Individually</label>
        </div>
        <div className="tab-right">
          <input
            type="checkbox"
            id="soldIndividually"
            name="Sold_Individually"
            checked={inputValue.Sold_Individually ? true : false}
            value={inputValue.Sold_Individually}
            onChange={handleChange}
          />
          <span>Limit purchases to 1 item per order ?</span>
        </div>
      </div>
      <div></div>
      <h5>CUSTOM FIELDS by CTX Feed</h5>
      <div className="tab-general">
        <div className="tab-left">
          <label>Availability Date</label>
        </div>
        <div className="tab-right">
          <input
            type="date"
            name="Availability_Date"
            value={inputValue.Availability_Date}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
