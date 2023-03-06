import { getProducts, getProductsSuccess, getProductsError, addProduct, deleteProduct, updateProduct } from "../slices/productSlice";
import axios from "axios";


export const fetchProducts = () => async dispatch => {
    try {
        dispatch(getProducts());
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/products`);
        if (response.status !== 200) {
            throw new Error("Error al obtener productos");
        }
        dispatch(getProductsSuccess(response.data));
    } catch (error) {
        dispatch(getProductsError(error.message));
    }
};

export const createProduct = product => async dispatch => {
    try {

        const response = await axios.post(`${process.env.REACT_APP_API_URI}/products`, product, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        if (response.status !== 201) {
            throw new Error("Algo salió mal");
        }
        dispatch(addProduct(product));
    } catch (error) {
        alert(error.response.data.errors);
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
        alert(error.response.data.errors);
    }
};

export const editProduct = product => async dispatch => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URI}/products/${product._id}`, product, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        if (response.status !== 200) {
            throw new Error("Algo salió mal");
        }
        dispatch(updateProduct(product));
    } catch (error) {
        alert(error.response.data.errors);
    }
};
