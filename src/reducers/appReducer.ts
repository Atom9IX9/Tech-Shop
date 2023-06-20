import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isActiveMenu: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveMenu: (state, action: PayloadAction<boolean>) => {
      state.isActiveMenu = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { setActiveMenu } = appSlice.actions;
export type TInitialState = typeof initialState;
