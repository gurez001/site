import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
const General = ({ setProduct_sale_price, setProduct_regular_price }) => {
  const [error, setError] = useState(null);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);

  useEffect(() => {
    if (max < min) {
      setError("Sale price should be less then from Regular price");
    } else {
      setError(null);
    }
  }, [min, max, alert]);

  return (
    <>
      <div className="tab-general">
        <div className="tab-left">
          <label htmlFor="regularprice">Regular price</label>
        </div>
        <div className="tab-right">
          <input
            type="text"
            id="regularprice"
            onChange={(e) => setMax(e.target.value)}
            onBlur={(e) => setProduct_regular_price(e.target.value)}
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
            onChange={(e) => setMin(e.target.value)}
            onBlur={(e) => setProduct_sale_price(e.target.value)}
          />
        </div>
      </div>
      {error && <p className="danger-text xsm-font-size">{error}</p>}
    </>
  );
};

export default General;
