import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState: TUserAuth = {
  uid: null,
  displayName: null,
  email: null,
  isAuth: false,
  phoneNumber: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUserAuth>) => {
      state.displayName = action.payload.displayName
      state.email = action.payload.email
      state.isAuth = action.payload.isAuth
      state.phoneNumber = action.payload.phoneNumber
      state.uid = action.payload.uid
    }
  }
})

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
export type TUserAuth = {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  isAuth: boolean;
  phoneNumber: string | null;
}