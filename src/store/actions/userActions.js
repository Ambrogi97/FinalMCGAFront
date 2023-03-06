import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const login = createAsyncThunk(
    "user/login",
    async (data, { dispatch, rejectWithValue }) => {
        try {

            const response = await axios.post(`${process.env.REACT_APP_API_URI}/users/login`, data);

            if (response.status !== 200) {
                throw new Error("Error al iniciar sesión");
            }
            const token = response.data.token;
            localStorage.setItem("token", JSON.stringify(token));

            dispatch(getUser(token));
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


export const getUser = createAsyncThunk(
    "user/getUser",
    async (token, { rejectWithValue }) => {

        try {

            const response = await axios.get(`${process.env.REACT_APP_API_URI}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status !== 200) {
                throw new Error("Error al iniciar sesión");
            }
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)