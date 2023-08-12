import productsAPI, {
  TProductCard,
  TProductLikeData,
} from "../api/productsAPI";
import categoriesAPI, {
  TCategoryCode,
  TMainCategory,
} from "../api/categoriesAPI";

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
  likedProducts: [] as number[], // products' id
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
  "products/fetchCategories",
  async () => {
    const categories = await categoriesAPI.getMainCategories();
    return categories;
  }
);

export const likeProduct = createAsyncThunk(
  "products/like",
  async ({ id, method }: TLikeProductPayload) => {
    const likedProduct = (await productsAPI.like(
      id,
      method
    )) as TProductLikeData;
    return { likedProduct, method };
  }
);

export const fetchLikedProductIds = createAsyncThunk(
  "products/fetchLiked",
  async () => {
    const likedProductIds = await productsAPI.getLikedProductIds();
    return likedProductIds.likedProductIds;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentCategory: (state, action: PayloadAction<TMainCategory>) => {
      state.currentCategory = action.payload;
    },
    resetLikedProducts: (state) => {
      state.likedProducts = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productCards = action.payload.rows;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(likeProduct.fulfilled, (state, action) => {
        if (action.payload.method === "ADD") {
          state.likedProducts = [
            ...state.likedProducts,
            Number(action.payload.likedProduct.productId),
          ];
        } else if (action.payload.method === "REMOVE") {
          state.likedProducts = state.likedProducts.filter(
            (id) => id !== Number(action.payload.likedProduct.productId)
          );
        }
      })
      .addCase(fetchLikedProductIds.fulfilled, (state, action) => {
        state.likedProducts = action.payload
      })
  },
});

export default productsSlice.reducer;
export const { setCurrentCategory, resetLikedProducts } = productsSlice.actions;

export type TInitialState = typeof initialState;

export type TProductCharacteristics = {
  categories: TCategoryCode[];
  characteristics?: { [key: string]: string };
};
type TFetchPostsPayload = {
  category: TCategoryCode;
  page: number;
};
type TLikeProductPayload = {
  id: number;
  method: "ADD" | "REMOVE";
};
