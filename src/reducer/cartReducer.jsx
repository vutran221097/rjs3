import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage, isEmptyObject, saveToStorage } from "../utils/utils";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      // count total amount
      const updatedTotalAmount =
        state.totalAmount +
        action.payload.item.price * action.payload.item.amount;
      // find item index
      const existingCartItemIndex = state.items.findIndex(
        (item) => item._id.$oid === action.payload.item._id.$oid
      );
      // get item from index
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      // if item is existing in cart
      if (existingCartItem) {
        // change amount number
        const updatedItem = {
          ...existingCartItem,
          amount:
            Number(existingCartItem.amount) +
            Number(action.payload.item.amount),
        };
        // coppy cart item arr
        updatedItems = [...state.items];
        // replace new item from item index
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // if item not in arr then push it in
        updatedItems = state.items.concat(action.payload.item);
      }

      // save to local storage and redux
      saveToStorage("cartItems", {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      });
      state.items = updatedItems;
      state.totalAmount = updatedTotalAmount;
      return state;
    },
    removeCart(state, action) {
      // find item with id
      const existingCartItemIndex = state.items.findIndex(
        (item) => item._id.$oid === action.payload.$oid
      );
      // check if item exist
      const existingItem = state.items[existingCartItemIndex];
      // minus total amount
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        // if item quantity < 1 filter item not include item have quantity = 0 (remove item from arr)
        updatedItems = state.items.filter(
          (item) => item._id.$oid !== action.payload.$oid
        );
      } else {
        // update quantity for item
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        // replace item in cart items
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      // save item to local storage and redux
      saveToStorage("cartItems", {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      });
      state.items = updatedItems;
      state.totalAmount = updatedTotalAmount;
      return state;
    },
    deleteCart(state, action) {
      // find item by id
      const existingCartItemIndex = state.items.findIndex(
        (item) => item._id.$oid === action.payload.$oid
      );
      const existingItem = state.items[existingCartItemIndex];
      // count total amount after delete item from array
      const updatedTotalAmount =
        state.totalAmount - existingItem.price * existingItem.amount;

      let updatedItems;
      // return new cart items
      updatedItems = state.items.filter(
        (item) => item._id.$oid !== action.payload.$oid
      );

      //save item to local storage and redux
      saveToStorage("cartItems", {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      });
      state.items = updatedItems;
      state.totalAmount = updatedTotalAmount;
      return state;
    },
    updateCart(state) {
      // call to get item from local storage and save to redux
      const currentItems = getFromStorage("cartItems", {});
      if (isEmptyObject(currentItems)) return;
      state.items = currentItems.items;
      state.totalAmount = currentItems.totalAmount;
      return state;
    },
  },
});

export const { addCart, removeCart, deleteCart, updateCart } = cart.actions;
export default cart.reducer;
