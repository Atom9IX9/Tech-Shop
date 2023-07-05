import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TProductCard, getProducts_API } from "../api/productsAPI";

export const initialState = {
  products: [] as TProductCard[]
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const products = await getProducts_API()
  return products
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
    })
  }
})

export default productsSlice.reducer

export type TInitialState = typeof initialState;