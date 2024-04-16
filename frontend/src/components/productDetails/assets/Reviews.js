import React, { memo, useEffect, useState } from "react";
import { ReviewStar } from "./ReviewStar";
import { useDispatch, useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";
import {
  get_product_review_action,
  reviewsClearError,
} from "../../../actions/ReviewsAction";
import { NEW_REVIEW_RESET } from "../../../constants/ReviewsConstant";
import { Paginations } from "../../../utils/Paginations";
import { useAlert } from "react-alert";
const Reviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product } = useSelector((state) => state.productDetails);
  const {
    success,
    review,
    resultPerpage,
    review_length,
    review_average,
    error: reverror,
  } = useSelector((state) => state.review);

  //current page
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (reverror) {
      alert.error(reverror);
      dispatch(reviewsClearError());
    }
    if (success) {
      alert.success("Review add successfully submited");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    const fetchData = async () => {
      try {
        dispatch(
          get_product_review_action(
            currentPage,
            product && product.product_uuid
          )
        );
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    if (product && product) {
      fetchData();
    }
    return () => {
      console.log("Cleanup code executed");
    };
  }, [dispatch, alert, success, reverror, currentPage, product]);

  return (
    <>
      <h2>REVIEWS</h2>

      <div className="review-cont">
        <ReviewStar
          review={review}
          review_length={review_length}
          review_average={review_average}
        />

        <div className="rev-col">
          {review && review.length > 0 ? (
            <>
              <div className="review-row">
                {review &&
                  review.map((item, i) => {
                    return (
                      <ReviewCard
                        key={i}
                        review={item}
                        length={review && review.length}
                      />
                    );
                  })}
              </div>
              {resultPerpage < review_length && (
                <Paginations
                  totalItemsCount={review_length}
                  activePage={currentPage}
                  itemsCountPerPage={resultPerpage}
                  handlePageChange={setCurrentPageNo}
                />
              )}
            </>
          ) : (
            <p className="noReview">NO Reviews yest</p>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Reviews);
