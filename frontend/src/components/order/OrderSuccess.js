import React from "react";

import { Link } from "react-router-dom";
import MetaData from "../layout/metaData/MetaData";

export const OrderSuccess = () => {
 // const searchQuery = useSearchParams()[0];
  //const referenceNo = searchQuery.get("reference");
  return (
    <>
      <MetaData
        title={"My Order Confirmed"}
        keywords={"My Order Confirmed"}
        content={"My Order Confirmed"}
      />

      <section className="section-cont">
        <div id="order-cont" className="cont-area-h">
          <div className="order-cont-area">
            <h1>Your order confirmed</h1>
            <Link to={"/order/me"}>View my order</Link>
            {/* {referenceNo ? <h3>referenceNo: {referenceNo}</h3> : null} */}
          </div>
        </div>
      </section>
    </>
  );
};
