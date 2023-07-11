import { createSlice } from "@reduxjs/toolkit";
import { saveToStorage } from "../utils/utils";

const initialState = {
  currentUser: {},
  isLoged: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login action
    logIn(state, action) {
      const { user } = action.payload;
      // save to local storage and redux
      saveToStorage("currentUser", user);
      state.isLoged = true;
      state.currentUser = user;
      return state;
    },
    // logout action
    logOut(state) {
      // delete from local storage and redux
      localStorage.removeItem("currentUser");
      state.isLoged = false;
      state.currentUser = {};
      return state;
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
