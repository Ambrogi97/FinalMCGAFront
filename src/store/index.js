import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/products";

const store = configureStore({
  reducer: {
    // your reducers
    products
  }
});

export default store;
