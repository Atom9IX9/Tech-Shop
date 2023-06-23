import { RootState } from "../../reducers/store";

// * app
export const getActiveMenu = (state: RootState) => state.app.isActiveMenu;

// * user
export const getIsAuth = (state: RootState) => state.user.isAuth;
export const getDisplayName = (state: RootState) => state.user.displayName;
export const getUserId = (state: RootState) => state.user.uid;
export const getUserEmail = (state: RootState) => state.user.email;
export const getUserPhoneNumber = (state: RootState) => state.user.phoneNumber;
