import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_ITEM,
} from "../constants/CartConstants";

export const cartReducer = (
  state = { cartItem: [], shippinginfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItem.find((i) => {
        return i.productId === item.productId;
      });
      if (isItemExist) {
        return {
          ...state,
          cartItem: state.cartItem.map((i) => {
            return i.productId === isItemExist.productId ? item : i;
          }),
        };
      } else {
        return {
          ...state,
          cartItem: [...state.cartItem, item],
        };
      }

    case REMOVE_CART_ITEM:
      if (!Array.isArray(action.payload)) {
        return {
          ...state,
          cartItem: state.cartItem.filter((i) => {
            return i.productId !== action.payload;
          }),
        };
      } else {
        return {
          ...state,
          cartItem: state.cartItem.filter(
            (i) => !action.payload.includes(i.productId)
          ),
        };
      }
    case SAVE_SHIPPING_ITEM:
      return {
        ...state,
        shippinginfo: action.payload,
      };

    default:
      return state;
  }
};
