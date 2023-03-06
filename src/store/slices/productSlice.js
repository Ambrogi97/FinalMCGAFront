import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  products: [],
  status: "idle",
  error: null
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: state => {
      state.status = "loading";
    },
    getProductsSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    },
    getProductsError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product._id !== action.payload);
    },
    updateProduct: (state, action) => {
      state.status = "loading";
    },
    updateProductSuccess: (state, action) => {
      state.products = state.products.map(product => {
        if (product._id === action.payload._id) {
          return action.payload;
        } else {
          return product;
        }
      });
    },
    updateProductError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    }
  }
});

export const {
  getProducts,
  getProductsSuccess,
  getProductsError,
  addProduct,
  deleteProduct,
  updateProduct
} = productsSlice.actions;

export default productsSlice.reducer;