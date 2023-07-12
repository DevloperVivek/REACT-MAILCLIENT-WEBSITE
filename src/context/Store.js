import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthRedux";

const store = configureStore({
  reducer: { auth: AuthReducer },
});

export default store;
