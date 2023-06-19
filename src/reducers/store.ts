import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import thunk, { ThunkAction } from "redux-thunk";
import { UnknownAsyncThunkAction } from "@reduxjs/toolkit/dist/matchers";

const store = configureStore({ reducer: rootReducer, middleware: [thunk] });

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type InferActionTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
export type AppDispatch = typeof store.dispatch;
export type TThunk<R = void> = ThunkAction<R, RootState, unknown, UnknownAsyncThunkAction>
