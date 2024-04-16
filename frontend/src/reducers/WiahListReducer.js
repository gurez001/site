import {
  ADD_TO_WISHLIST,
  CREATE_WISHLIST_FAILED,
  CREATE_WISHLIST_REQUEST,
  CREATE_WISHLIST_RESET,
  CREATE_WISHLIST_SUCCESS,
  REMOVE_WISHLIST_ITEM,
  WISHLIST_CLEAR_ERROR,
} from "../constants/WishListConstants";

export const WishListReducer = (state = { wishL: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const item = action.payload;

      const isItemExist = state.wishL.find((i) => {
        return i.productId === item.productId;
      });

      if (isItemExist) {
        return {
          ...state,
          wishL: state.wishL.map((i) => {
            return i.productId === isItemExist.productId ? item : i;
          }),
        };
      } else {
        return {
          ...state,
          wishL: [...state.wishL, item], // Fix the typo here
        };
      }
    case REMOVE_WISHLIST_ITEM:
      return {
        ...state,
        wishL: state.wishL.filter((i) => {
          return i.productId !== action.payload;
        }),
      };
    case CREATE_WISHLIST_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case CREATE_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: true,
        success: true,
      };
    case CREATE_WISHLIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_WISHLIST_RESET:
      return {
        ...state,
        loading: false,
        success: null,
      };
    case WISHLIST_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
