import { configureStore } from "@reduxjs/toolkit";
import AuthRedux from "./Auth-Redux";

const store = configureStore({
  reducer: { auth: AuthRedux },
});

export default store;
