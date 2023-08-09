import productsAPI, {
  TProductCard,
} from "../api/productsAPI";
import {
  TCategoryCode,
  TMainCategoryCode,
  TSubCategory,
  getSubCategories_API,
} from "../api/categoriesAPI";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  productCards: [] as TProductCard[],
  fetchings: {
    like: false,
  },
  categories: [
    "laptops_and_computers",
    "smartphones_tv_and_electronics",
    "goods_for_gamers",
    "household_appliances",
    "beauty_and_health",
    "sports_and_hobbies",
  ] as TMainCategoryCode[],
  currentCategory: {
    code: null as TCategoryCode | null,
    subcategories: null as null | TSubCategory[],
  },
  page: 1,
  pageSize: 10
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({page, category}: TFetchPostsPayload) => {
    const products = await productsAPI.getAllProducts(category, initialState.pageSize, page);
    return products
  }
);
export const fetchSubcategories = createAsyncThunk(
  "products/fetchSubcategories",
  async (category: TCategoryCode) => {
    const subcategories = await getSubCategories_API(category);
    return subcategories;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentCategory: (state, action: PayloadAction<TCategoryCode>) => {
      state.currentCategory.code = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productCards = action.payload.rows
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.currentCategory.subcategories = action.payload;
      });
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
  category: TCategoryCode,
  page: number
}

