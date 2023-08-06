import { RootState } from "reducers/store";

export const getUserName = (state: RootState) => state.user.name;
export const getUserSurname = (state: RootState) => state.user.surname;
export const getUserRole = (state: RootState) => state.user.role;
export const getUserId = (state: RootState) => state.user.id;
export const getUserEmail = (state: RootState) => state.user.email;
export const getUserCity = (state: RootState) => state.user.city;