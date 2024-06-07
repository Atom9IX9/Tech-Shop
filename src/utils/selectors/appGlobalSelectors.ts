import { RootState } from "reducers/store";

export const getActiveMenu = (state: RootState) => state.app.isActiveMenu;
export const getDialogs = (state: RootState) => state.app.dialogs;