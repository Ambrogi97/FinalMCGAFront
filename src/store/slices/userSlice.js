import { createSlice } from "@reduxjs/toolkit";
import { login, getUser } from "../actions/userActions";

const initialState = {
    user: {},
    status: "idle", 
    error: null,
    token: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: state => {
            state.user = {};
            state.status = "idle";
            state.error = null;
            state.token = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                alert(state.error + ": Invalid username or password");
            })
            .addCase(getUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
