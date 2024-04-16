import React from "react";
import { NavLink } from "react-router-dom";
import Currency from "../../layout/currency/Currency";
import { server_url } from "../../../utils/Url";

export const CartItemCart = ({ item }) => {
  console.log(item);
  return (
    <>
      <div className="col-md-7">
        <div className="row">
          <div className="thumb col-md-2">
            <img src={`${server_url()}/${item.path}`} alt="imagesss" />
          
          </div>
          <div
            className="product-item col-md-10 w-item-tittle"
            style={{ padding: 5 }}
          >
            <h2>
              <NavLink style={{ fontWeight: 600 }} to={`/product/${item.link}`}>
                {item.name}
              </NavLink>
            </h2>
          </div>
        </div>
      </div>

      {/* <div className="cart-img">
       
      </div>
      <div className="w-item-tittle">
        <h2>
          
        </h2>
      </div>
      <div className="cart-price">
        <Currency price={item.price} />
      </div> */}
    </>
  );
};
