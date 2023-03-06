import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      state.products = state.products.map(product => {
        if (product._id === action.payload._id) {
          return action.payload;
        }
        return product;
      });
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

export const fetchProducts = () => async dispatch => {
  try {
    dispatch(getProducts());
    const response = await axios.get(`${process.env.REACT_APP_API_URI}/products`);
    if (response.status !== 200) {
      throw new Error("Error al obtener producto");
    }
    dispatch(getProductsSuccess(response.data));
  } catch (error) {
    dispatch(getProductsError(error.message));
  }
};

export const createProduct = product => async dispatch => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URI}/products`, product);
    if (response.status !== 201) {
      throw new Error("algo salio mal");
    }
    dispatch(addProduct(product));
  } catch (error) {
    console.error(error);
  }
};

export const removeProduct = product => async dispatch => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URI}/products/${product._id}`);
    if (response.status !== 200) {
      throw new Error("Error al eliminar el producto");
    }
    dispatch(deleteProduct(product._id));
  } catch (error) {
    console.error(error);
  }
};

export const editProduct = product => async dispatch => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URI}/products/${product._id}`, product);
    if (response.status !== 200) {
      throw new Error("algo salio mal");
    }
    dispatch(updateProduct(product));
  } catch (error) {
    console.error(error);
  }
};
