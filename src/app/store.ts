import {configureStore} from "@reduxjs/toolkit";
import appSliceReducer from "../features/App/appSlice"

export const store = configureStore({reducer: {appSliceReducer}});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;