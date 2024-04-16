import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";

import { useAlert } from "react-alert";
// import { Button } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";
import { Aside } from "../../aside/Aside";
import "./orderlist.css";
import {
  ClearError,
  // adminGetAllProducts,
  // deleteAdminProduct,
} from "../../../../actions/ProductAction";
import { FaUpRightFromSquare, FaTrash } from "react-icons/fa6";
// import { DELETE_PRODUCT_RESET } from "../../../../constants/ProductConstants";
import { deleteOrder, getAllorders } from "../../../../actions/OrderAction";
import { DELETE_ORDER_RESET } from "../../../../constants/OrderConstants";
import { Helmet } from "react-helmet";
import Loader from "../../../layout/loader/Loader";
import MetaData from "../../../layout/metaData/MetaData";
import { TimeAgo } from "../../../layout/time/TimeAgo";
import Currency from "../../../layout/currency/Currency";


const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  // const [dateArr, setDateArr] = useState([]);

  const {
    error: deletError,
    isDeleted,
    loading: deleteLoading,
  } = useSelector((state) => state.adminOrders);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const [pageSize, setPageSize] = useState(20);

const handlePageSizeChange = (newPageSize) => {
  setPageSize(newPageSize);
};

  useEffect(() => {
    // const orderTime = document.querySelectorAll(".order-time span");
    // const arr = [];
    // orderTime && orderTime.forEach((item) => arr.push(item.textContent));
    // setDateArr(arr);
   
   

    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (deletError) {
      alert.error(deletError);
      dispatch(ClearError());
    }
    if (isDeleted) {
      alert.success("Product deleted succesfully");

      dispatch({
        type: DELETE_ORDER_RESET,
      });
    }
    dispatch(getAllorders());
  }, [alert, dispatch, error, Navigate, isDeleted, deletError]);

  const columns = [
    {
      field: "id",
      headerName: "Orider Id",
      minWidth: 150,
      with:100,
    },
    // {
    //   field: "name",
    //   headerName: "Name",
    //   minWidth: 150,
    //   flex: 0.3,
    // },
    {
      field: "date",
      headerName: "Date",
      minWidth: 150,
      with:100,
      renderCell: (params) => <TimeAgo time={params.value} />,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      with:100,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Shipped"
          ? "colorYellow"
          : params.getValue(params.id, "status") === "Delivered"
          ? "colorGreen"
          : "colorRed";
      },
    },
    {
      field: "Qty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      with:100,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 200,
      with:100,
      renderCell: (params) => <Currency price={params.value} />,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 200,
      with:100,
      shortable: false,
      renderCell: (params) => {
        return (
          <>
            <MetaData
              title={"Admin all orders"}
              content={"Admin all orders"}
              keywords={"Admin all orders"}
            />
            <NavLink
              to={`/admin/update-orders/${params.getValue(params.id, "id")}`}
            >
              <FaUpRightFromSquare />
            </NavLink>
            <span
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <FaTrash />
            </span>
          </>
        );
      },
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item, i) => {
      let totalQuantity = 0;
      //let name = "";
      // item.orderItem.forEach((orderItem) => {
      //   totalQuantity += orderItem.quantity;
      //   //name += orderItem.name;
      // });
      rows.push({
        id: `${item._id}`,
       // name: item.orderItem[0].name,
        // itemQty: item.orderItem.length,
        date: item.order_info_created_date,
        status: item.order_info_status,
        Qty: item.order_info_total_order_quantity,
        amount: item.order_info_total_price,
      });
    });

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Admin OrderList
        </title>
        <meta name="keywords" content="Admin OrderList" />
      </Helmet>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <div className="all-order-cont">
                  <div className="all-order-content-area">
                    <div className="all-order-title">
                      <h1>Order</h1>
                      <p>{orders && orders.length} Orders found</p>
                    </div>
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        {/* {orders &&
                          orders.map((item, i) => (
                            <div key={i} className="order-time">
                              <TimeAgo time={item.creditAt} />
                            </div>
                          ))} */}
                        <div className="orderdata">
                          <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={pageSize}
                            rowsPerPageOptions={[10,20, 25, 50, 100]}
                            onPageSizeChange={handlePageSizeChange}
                            disableSelectionOnClick
                            className="order-list-table"
                            autoHeight
                            pagination
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
