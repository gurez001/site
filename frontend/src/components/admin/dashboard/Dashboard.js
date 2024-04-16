import React, { useEffect } from "react";
import { Aside } from "../aside/Aside";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./dashboard.css";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as Chartjs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { adminGetAllProducts } from "../../../actions/ProductAction";
import { getAllorders } from "../../../actions/OrderAction";
import { getAllUsers } from "../../../actions/UserAction";
import MetaData from "../../layout/metaData/MetaData";

Chartjs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.adminUsers);

  useEffect(() => {
    dispatch(adminGetAllProducts());
    dispatch(getAllorders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let outofstock = 0;
  products &&
    products.forEach((item, i) => {
      if (item.stock === 0) {
        outofstock += 1;
      }
    });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      if (item.orderStatus === "Delivered") {
        totalAmount += item.totalPrice;
      }
    });

  const data = {
    labels: ["Inital Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["red"],
        hoverBackgroundColor: ["green"],
        data: [0, totalAmount],
      },
    ],
  };
  const doughuntState = {
    labels: ["Out of stock", "Instock"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["red", "green"],
        hoverBackgroundColor: ["black", "yellow"],
        data: [outofstock, products && products.length - outofstock],
      },
    ],
  };

  const options = {
    // Plugins: {
    //   legend: true,
    // },
    // scales: {
    //   y: {
    //     min: 3,
    //     max: 6,
    //   },
    // },
  };

  return (
    <>
      <MetaData
        title={"Admin Dashboard"}
        content={"Admin Dashboard"}
        keywords={"Admin Dashboard"}
      />
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <div className="dashboard-cont">
                  <div className="dashboard-content-area">
                    <div className="dashboard-title">
                      <h1>Dashboard</h1>
                    </div>

                    <div className="dashboard-summary">
                      <p>
                        <span> Total</span>

                        <span>{totalAmount}</span>
                      </p>
                    </div>
                    <div className="dashboard-summary-box-2">
                      <NavLink to={"/admin/all-products"}>
                        <p>Product</p>
                        <p>{products && products.length}</p>
                      </NavLink>
                      <NavLink to={"/admin/orders"}>
                        <p>orders</p>
                        <p>{orders && orders.length}</p>
                      </NavLink>
                      <NavLink to={"/admin/users"}>
                        <p>user</p>
                        <p>{users && users.length}</p>
                      </NavLink>
                    </div>
                    <div className="line-Chart">
                      <h2>Total Amount Earned</h2>
                      <Line data={data} options={options} />
                    </div>
                    <div className="line-Chart">
                      <h2>Total Stock</h2>
                      <Doughnut data={doughuntState} />
                    </div>
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
