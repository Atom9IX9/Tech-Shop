import { RootState } from "../../reducers/store";

export const getIsAuth = (state: RootState) => state.user.isAuth;
export const getDisplayName = (state: RootState) => state.user.displayName;
export const getUserId = (state: RootState) => state.user.uid;
export const getUserEmail = (state: RootState) => state.user.email;
export const getUserPhoneNumber = (state: RootState) => state.user.phoneNumber;
export const getUserCity = (state: RootState) => state.user.city;