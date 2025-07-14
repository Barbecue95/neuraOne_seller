import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/users.slice";
import authReducer from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
