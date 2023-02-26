import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/products";
import users from "./slices/user";

const store = configureStore({
  reducer: {
    // your reducers
    products,
    users
  }
});

export default store;
