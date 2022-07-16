import * as actionTypes from "./shopping-types";
import monitor1 from "../../assets/products/monitor1.jpeg"
import monitor2 from "../../assets/products/monitor2.jpeg"
import monitor3 from "../../assets/products/monitor3.jpeg"

const INITIAL_STATE = {
  products: [
    {
      id: 1,
      title: "Lorem Ipsum",
      description: "lorem ipsum dolor sit amet detail 1",
      price: 15.0,
      image: monitor1,
    },
    {
      id: 2,
      title: "Lorem Ipsum 2",
      description: "lorem ipsum dolor sit amet detail 2",
      price: 20.0,
      image: monitor2,
    },
    {
      id: 3,
      title: "Lorem Ipsum 3",
      description: "lorem ipsum dolor sit amet detail 3",
      price: 150.0,
      image: monitor3,
    },
  ],
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );

      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
