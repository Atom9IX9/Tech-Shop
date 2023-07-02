import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TCoords } from "../utils/getUserCoords";
import userAPI from "../api/userAPI";

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
  async ({ latitude, longitude }: TCoords) => {
    const address = await userAPI.getAddress(latitude, longitude);
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserLocationByCoords.fulfilled, (state, action) => {
      state.city = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
export type TUserAuth = {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  isAuth: boolean;
  phoneNumber: string | null;
  city?: string;
};
