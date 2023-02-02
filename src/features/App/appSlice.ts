import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { orderCall } from "./appApiSlice";

interface IAppInitialState {
    location: string;
    status: string;
    error: string;
}

const initialState: IAppInitialState = {
    location: "/",
    status: "idle",
    error: "",
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
        setLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
        }
    },
    extraReducers: {
        [orderCall.pending.type]: (state) => {
            state.status = "pending";
        },
        [orderCall.fulfilled.type]: (state) => {
            state.status = "fulfilled";
            state.error = "";
        },
        [orderCall.rejected.type]: (state, action: PayloadAction<any>) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    },
});

export const { setLocation, setStatus } = appSlice.actions;

export default appSlice.reducer;
