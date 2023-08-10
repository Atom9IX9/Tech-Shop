import productsAPI, { TProductCard } from "../api/productsAPI";
import categoriesAPI, { TCategoryCode, TMainCategory } from "../api/categoriesAPI";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  productCards: [] as TProductCard[],
  fetchings: {
    like: false,
  },
  categories: [] as TMainCategory[],
  currentCategory: null as TMainCategory | null,
  page: 1,
  pageSize: 10,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, category }: TFetchPostsPayload) => {
    const products = await productsAPI.getAllProducts(
      category,
      initialState.pageSize,
      page
    );
    return products;
  }
);

export const fetchCategories = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const categories = await categoriesAPI.getMainCategories()
    return categories
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentCategory: (state, action: PayloadAction<TMainCategory>) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productCards = action.payload.rows;
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    })
  },
});

export default productsSlice.reducer;
export const { setCurrentCategory } = productsSlice.actions;

export type TInitialState = typeof initialState;

export type TProductCharacteristics = {
  categories: TCategoryCode[];
  characteristics?: { [key: string]: string };
};
type TFetchPostsPayload = {
  category: TCategoryCode;
  page: number;
};
