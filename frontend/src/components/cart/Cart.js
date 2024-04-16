import React, { useEffect, useState } from "react";
import { CartItemCart } from "./assets/CartItemCart";
import QunContBtn from "./assets/QunContBtn";
import { SubTotal } from "./assets/SubTotal";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import RemoveItem from "./assets/RemoveItem";
import "./cart.css";
import MetaData from "../layout/metaData/MetaData";
import Currency from "../layout/currency/Currency";

const Cart = () => {
  const Navigate = useNavigate();
  const { cartItem } = useSelector((state) => state.cart);
  const [cItem, setCitem] = useState(0);


  const checkOutEvent = () => {
    Navigate("/shipping");
  };

  useEffect(() => {
    setCitem(cartItem.length);
  }, [cartItem]);
console.log(cartItem)
  return (
    <>
      <MetaData title={"My cart"} content={"My cart"} keywords={"My cart"} />
      <section className="section-cont">
        <div id="cart-cont" className="cont-area-h">
          {cItem === 0 ? (
            <>
              <div className="cart-emty">
                <h1>Cart is Emty</h1>
                <p>
                  <NavLink to={"/shop"}>View product</NavLink>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="page-cart">
                <div className="cart-page-header">
                  <h1>Your Shopping Cart</h1>
                </div>
                <div className="cart-containor">
                  <div className="postbox order-form-area">
                    <div style={{alignItems:'center'}} className="postbox-header row">
                      <div className="col-md-7">
                        <p className="xsm-font-size">PRODUCT</p>
                      </div>
                      <div className="col-md-2">
                        <p className="xsm-font-size"> PRICE</p>
                      </div>
                      <div  className="col-md-2">
                        <p  className="xsm-font-size">QUANTITY</p>
                      </div>
                      <div style={{textAlign:'end'}} className="col-md-2">
                        <p className="xsm-font-size">SUBTOTAL</p>
                      </div>
                      <div style={{textAlign:'end'}} className="col-md-2">
                        <p className="xsm-font-size">REMOVE</p>
                      </div>
                    </div>
                    {cartItem &&
                      cartItem.map((item, i) => (
                        <div  style={{alignItems:'center'}}  className="postbox-inner row w-item" key={i}>
                          <CartItemCart item={item} />
                          <div className=" col-md-2">
                            <p>
                              {" "}
                              <Currency price={item.price} />
                            </p>
                          </div>
                          <div className=" col-md-2">
                            <QunContBtn item={item} />
                          </div>
                          <div style={{textAlign:'end'}} className=" col-md-2">
                            <p>
                              <SubTotal
                                item={item.price}
                                quantity={item.quantity}
                              />
                            </p>
                          </div>
                          <div style={{textAlign:'end'}} className=" col-md-2">
                          <RemoveItem  item={item} /> 
                          </div>
                        </div>
                     
                      ))}
                  </div>
                </div>
                <div style={{justifyContent:'center',alignItems:'center'}} className="gross-profit row" >
                  <div className="groos-profit-row col-md-2">
                    <Currency
                      price={cartItem.reduce((acc, item) => {
                        return acc + item.quantity * item.price;
                      }, 0)}
                    />
                  </div>
                  <div className="checkout-btn col-md-2">
                    <button style={{cursor:'pointer'}} onClick={checkOutEvent}>Checkout</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
