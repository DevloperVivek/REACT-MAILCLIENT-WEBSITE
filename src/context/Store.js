import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth-Redux";

const store = configureStore({
  reducer: { auth: AuthReducer },
});

export default store;
