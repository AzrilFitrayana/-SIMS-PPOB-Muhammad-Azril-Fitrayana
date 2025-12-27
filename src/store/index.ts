import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import balanceReducer from "./slices/balance";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: balanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
