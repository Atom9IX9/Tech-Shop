import { TCoords } from "../utils/getUserCoords";
import userAPI, { TSignUpData } from "../api/userAPI";
import { TLng } from "../types/types";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState: TUserAuth = {
  id: null,
  role: "GUEST",
  name: null,
  surname: null,
  email: null,
  city: undefined,
  error: undefined
};

export const fetchUserLocationByCoords = createAsyncThunk(
  "user/fetchAddress",
  async ({
    coords: { latitude, longitude },
    lng,
  }: TFetchUserLocationByCoordsPayload) => {
    const address = await userAPI.getAddress(latitude, longitude, lng);
    return address.city || address.town;
  }
);

export const signUpUser = createAsyncThunk(
  "user/sign-up",
  async (signUpData: TSignUpData, thunk) => {
    try {
      const data = await userAPI.signUp(signUpData)
    return data.user
    } catch (error: any) {
      return thunk.rejectWithValue(error)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUserAuth>) => {
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    resetUser: (state) => {
      state.role = "GUEST"
      state.name = null;
      state.surname = null;
      state.email = null;
      state.id = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserLocationByCoords.fulfilled, (state, action) => {
      state.city = action.payload;
    })
    .addCase(signUpUser.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.name = action.payload.name
      state.surname = action.payload.surname
      state.error = undefined
    })
    .addCase(signUpUser.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload
    })
    .addCase(signUpUser.pending, (state) => {
      if (state.error) {
        state.error.message = "pending"
      }
    })
  },
});

export default userSlice.reducer;
export const { setUser, resetUser } = userSlice.actions;
export type TUserAuth = {
  id: number | null;
  role: "USER" | "GUEST" | "ADMIN"
  name: String | null;
  surname: String | null;
  email: string | null;
  city?: string;
  error?: {
    message: string | "pending",
    info?: any
  }
};
type TFetchUserLocationByCoordsPayload = {
  coords: TCoords;
  lng: TLng;
};
