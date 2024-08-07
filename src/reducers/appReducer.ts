import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isActiveMenu: false,
  dialogs: {
    basket: false,
    catalogue: false,
  }
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveMenu: (state, action: PayloadAction<boolean>) => {
      state.isActiveMenu = action.payload;
    },
    setDialog: (state, action: PayloadAction<{name: TDialogsName, value: boolean}>) => {
      state.dialogs[action.payload.name] = action.payload.value;
    }
  },
});

export default appSlice.reducer;
export const { setActiveMenu, setDialog } = appSlice.actions;
export type TInitialState = typeof initialState;
export type TDialogsName = "basket" | "catalogue";
