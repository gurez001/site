import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";

import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";
import { Aside } from "../../aside/Aside";
import "./review.css";
import { FaUpRightFromSquare, FaTrash } from "react-icons/fa6";
import {
  ClearError,
  adminGetAllProducts,
  deleteAdminProduct,
  deleteReviews,
  getAllReview,
} from "../../../../actions/ProductAction";
import {
  DELETE_PRODUCT_RESET,
  DELETE_REVIEW_RESET,
} from "../../../../constants/ProductConstants";
import Loader from "../../../layout/loader/Loader";
import MetaData from "../../../layout/metaData/MetaData";
import { getAllProductReview } from "../../../../actions/ReviewsAction";

export const Reviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const {
    error: deletError,
    isDeleted,
    loading,
  } = useSelector((state) => state.contReview);

  const {
    error,
    product,
    loading: reviewLoading,
  } = useSelector((state) => state.productReviews);


  const deletehandler = (reviewId) => {
    // dispatch(deleteReviews(reviewId, singupValue.productId));
  };



  useEffect(() => {
    // if (singupValue.productId.length === 24) {
    //   dispatch(getAllReview(singupValue.productId));
    // }
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    // if (deletError) {
    //   alert.error(deletError);
    //   dispatch(ClearError());
    // }
    // if (isDeleted) {
    //   alert.success("Review deleted succesfully");
    //   Navigate("/admin/reviews");
    //   dispatch({
    //     type: DELETE_REVIEW_RESET,
    //   });
    // }
    // dispatch(adminGetAllProducts());
    dispatch(getAllProductReview());
  }, [alert, dispatch, error]);

  const columns = [
    {
      field: "id",
      headerName: "Review id",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "comment",
      headerName: "Comment",
      type: "number",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 200,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "colorYellow"
          : "colorRed";
      },
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 200,
      flex: 0.3,
      shortable: false,
      renderCell: (params) => {
        return (
          <>
            <NavLink
              to={`/admin/update-review/${params.getValue(params.id, "id")}`}
            >
              <FaUpRightFromSquare />
            </NavLink>
            <span
              onClick={() => deletehandler(params.getValue(params.id, "id"))}
            >
              <FaTrash />
            </span>
          </>
        );
      },
    },
  ];

  const rows = [];
  product &&
    product.forEach((item, i) => {
      rows.push({
        id: item.reviewid,
        user: item.user.name,
        comment: item.comment,
        rating: item.rating,
      });
    });

  return (
    <>
      <MetaData
        title={"Admin product review"}
        content={"Admin product review"}
        keywords={"Admin product review"}
      />

      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <div className="all-review-cont">
                  <div className="all-review-content-area">
                    <div className="all-review-title">
                      <h1>All Reviews</h1>
                    </div>
                    <div className="reviewdata">
                      {loading ? (
                        <Loader />
                      ) : (
                        <>
                          {product && product.length > 0 ? (
                            <DataGrid
                              rows={rows}
                              columns={columns}
                              // page={10}
                              disableSelectionOnClick
                              className="review-list-table"
                              autoHeight
                            />
                          ) : (
                            <h2>No reviews found</h2>
                          )}
                        </>
                      )}
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
