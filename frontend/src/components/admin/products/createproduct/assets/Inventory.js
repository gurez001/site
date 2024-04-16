import React from "react";

const Inventory = ({
  setSKU,
  setStock,
  setSold_Individually,
  setAvailability_Date,

}) => {
  return (
    <div>
      <div className="tab-general">
        <div className="tab-left">
          <label>SKU</label>
        </div>
        <div className="tab-right">
          <input
            type="number"
            name="sku"
            onBlur={(e) => setSKU(e.target.value)}
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
            name="stockmanagement"
            onBlur={(e) => setStock(e.target.value)}
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
            name="soldIndividually"
            onBlur={(e) => setSold_Individually(e.target.value)}
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
            name="availinilityDate"
            onBlur={(e) => setAvailability_Date(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
