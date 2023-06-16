import { RootState } from "../reducers/store";

export const getActiveMenu = (state: RootState) => state.app.isActiveMenu;
