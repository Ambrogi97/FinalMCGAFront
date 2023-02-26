import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    status: "idle", // loading | succeeded | failed
    error: null,
    token: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginPending: (state, action) => {
            state.status = "loading";
        },
        loginSuccess: (state, action) => {
            state.status = "succeeded";
            state.token = action.payload;
        },
        loginError: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        logoutPending: (state, action) => {
            state.status = "loading";
        },
        logoutSuccess: (state, action) => {
            state.status = "idle";
            state.token = null;
            state.user = {};
        },
        logoutError: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }

    }

});

export const {
    loginPending,
    loginSuccess,
    loginError,
    logoutPending,
    logoutSuccess,
    logoutError
} = userSlice.actions;

export default userSlice.reducer;

// login
export const login = (email, password) => async dispatch => {
    try {
        dispatch(loginPending());
        const response = await axios.post(`${process.env.REACT_APP_API_URI}/users/login`, {
            email,
            password
        });
        if (response.status !== 200) {
            throw new Error("Error logging in");
        }
        localStorage.setItem("token", response.data.token);
        dispatch(loginSuccess(response.data.token));
    } catch (error) {
        dispatch(loginError(error.message));
    }
}

// logout
export const logout = () => async dispatch => {
    try {
        dispatch(logoutPending());
        localStorage.removeItem("token");
        console.log("logout");
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutError(error.message));
    }
}