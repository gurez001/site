import React from "react";
import LazyLoadImages from "../../layout/lazyload/LazyLoadImages";
import RemoveWishItem from "./RemoveWishItem";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../../actions/cartAction";
import Currency from "../../layout/currency/Currency";
export const WishListItem = ({ item }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const buyNow = (id, qunty) => {
    dispatch(addItemsToCart(id, qunty));
    Navigate("/cart");
  };

  return (
    <>
      <div
        style={{ alignItems: "center" }}
        className="postbox-inner row w-item"
      >
        <div className="col-md-8">
          <div style={{ gap: 5 }} className="row">
            <div className="thumb col-md-4">
              <LazyLoadImages product={item} />
            </div>

            <div className="col-md-8">
              <h2>
                <NavLink
                  style={{ fontWeight: 600 }}
                  to={`/product/${item.link}`}
                >
                  {item.name}
                </NavLink>
              </h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <p>
            <Currency price={item.price} />{" "}
          </p>
        </div>
        <div className="col-md-3">
          <Button onClick={() => buyNow(item.link, 1)}>Buy now</Button>
        </div>
        <div style={{ textAlign: "end" }} className="col-md-3">
          <RemoveWishItem item={item} />
        </div>
      </div>
    </>
  );
};
