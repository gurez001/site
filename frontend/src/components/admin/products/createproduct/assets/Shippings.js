import React from "react";

const Shippings = ({ 
  setWeight,
  setDimensions,
  Shipping_class,
  
 }) => {
  return (
    <>
      <div>
        <div className="tab-general">
          <div className="tab-left">
            <label>Weight (g)</label>
          </div>
          <div className="tab-right">
            <input
              type="number"
              name="weight"
              onBlur={(e)=>setWeight(e.target.value)}
            />
          </div>
        </div>
        {/* <div className="tab-general">
          <div className="tab-left">
            <label>Dimensions (cm)</label>
          </div>
          <div className="tab-right">
            <div className="tab-flex">
              <input
                type="number"
                name="dimensionslength"
                value={inputValue.dimensionslength}
                onBlur={(e)=>setWeight(e.target.value)}
              />
              <input
                type="number"
                name="dimensionswidth"
                value={inputValue.dimensionswidth}
                onChange={onchageInputValue}
                placeholder="width"
              />
              <input
                type="number"
                name="dimensionsheight"
                value={inputValue.dimensionsheight}
                onChange={onchageInputValue}
                placeholder="height"
              />
            </div>
          </div>
        </div> */}
        {/* <div className="tab-general">
          <div className="tab-left">
            <label>Shipping class</label>
          </div>
          <div className="tab-right">
            <select
              name="shippingclass"
            o
            >
              <option value="no shipping class">No Shipping Class</option>
            </select>
          </div>
        </div> */}
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default Shippings;
