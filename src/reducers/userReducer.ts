import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TCoords } from "../utils/getUserCoords";
import userAPI from "../api/userAPI";
import { TLng } from "../types/types";

export const initialState: TUserAuth = {
  uid: null,
  displayName: null,
  email: null,
  isAuth: false,
  phoneNumber: null,
  city: undefined,
};

export const fetchUserLocationByCoords = createAsyncThunk(
  "fetchUserAddress",
  async ({
    coords: { latitude, longitude },
    lng,
  }: TFetchUserLocationByCoordsPayload) => {
    const address = await userAPI.getAddress(latitude, longitude, lng);
    return address.city || address.town;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUserAuth>) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.isAuth = action.payload.isAuth;
      state.phoneNumber = action.payload.phoneNumber;
      state.uid = action.payload.uid;
    },
    resetUser: (state) => {
      state.displayName = null;
      state.email = null;
      state.isAuth = false;
      state.phoneNumber = null;
      state.uid = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserLocationByCoords.fulfilled, (state, action) => {
      state.city = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { setUser, resetUser } = userSlice.actions;
export type TUserAuth = {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  isAuth: boolean;
  phoneNumber: string | null;
  city?: string;
};
type TFetchUserLocationByCoordsPayload = {
  coords: TCoords;
  lng: TLng;
};
