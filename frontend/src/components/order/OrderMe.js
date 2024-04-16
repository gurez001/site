import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getMyorders } from "../../actions/OrderAction";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import "./style.css";
import { OrderCard } from "./assets/OrderCard";
import MetaData from "../layout/metaData/MetaData";
import { Paginations } from "../../utils/Paginations";

export const OrderMe = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, orders,order_count,resultPerpage, error } = useSelector((state) => state.myOrders);



  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getMyorders(currentPage));
  }, [dispatch, error, alert,currentPage]);


  return (
    <>
      <MetaData
        title={"My Orders"}
        keywords={"My Orders"}
        content={"My Orders"}
      />
      <section className="section-cont">
        <div id="prod-cont" className="cont-area-h">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="my-order-page">
                <div className="order-title">
                  <h1>Order</h1>
                  <p>{order_count && order_count} Orders found</p>
                </div>
                <OrderCard orders={orders} />
              </div>
            </>
          )}
        </div>
        {resultPerpage < order_count && (
        <Paginations
          totalItemsCount={order_count}
          activePage={currentPage}
          itemsCountPerPage={resultPerpage}
          handlePageChange={setCurrentPageNo}
        />
      )}
      </section>
    </>
  );
};
