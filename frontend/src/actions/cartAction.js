import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_ITEM,
} from "../constants/CartConstants";
import axios from "axios";
import { server_url } from "../utils/Url";
import { get_method } from "../utils/Headers";

export const addItemsToCart =
  (id, quantity, price, label) => async (dispatch, getState) => {
    const { data } = await axios.get(
      `${server_url()}/api/v1/product/${id}`,
      get_method()
    );
    dispatch({
      type: ADD_TO_CART,
      payload: {
        productId: data.Product._id,
        link: data.Product.slug,
        product_uuid: data.Product.product_uuid,
        name: data.Product.product_name,
        price: price ? price : data.Product.product_sale_price,
        path: data.Product.product_images[0].path,
        category: data.Product.product_category[0].slug,
        quantity,
        label,
      },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItem));
  };

export const removeCartItem = (id) => async (dispatch, getState) => {
  if (!Array.isArray(id)) {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItem));
  } else {
    localStorage.removeItem("cartItems");
  }
};

export const saveShippingInfo = (data) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_SHIPPING_ITEM,
    payload: data,
  });
  localStorage.setItem(
    "shippinginfo",
    JSON.stringify(getState().cart.shippinginfo)
  );
};
