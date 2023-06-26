import { AnyAction, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import thunk, { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";

const store = configureStore({ reducer: rootReducer, middleware: [thunk] });

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
