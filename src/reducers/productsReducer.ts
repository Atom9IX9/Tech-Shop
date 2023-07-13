import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  TCategoryCode,
  TProductCard,
  getProducts_API,
  updateProduct_API,
} from "../api/productsAPI";

export const initialState = {
  productCards: [] as TProductCard[],
  fetchings: {
    like: false,
  },
  categories: [
    { code: "all", categoryName: "All" },
    { code: "cosmetic", categoryName: "Cosmetic" },
    { code: "hair", categoryName: "Hair" },
    { code: "shampoo", categoryName: "Shampoo" },
    { code: "sport", categoryName: "Sport" },
    { code: "electric_transport", categoryName: "Electric transport" },
    {
      code: "electric_transport_accessories",
      categoryName: "Electric transport accessories",
    },
    { code: "household_appliances", categoryName: "Household appliances" },
    { code: "kitchen", categoryName: "Kitchen" },
    { code: "electric_kettles", categoryName: "Electric kettles" },
    { code: "headphone", categoryName: "Headphone" },
  ] as TCategory[],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const products = await getProducts_API();
    return products;
  }
);

export const addLike = createAsyncThunk(
  "products/likeAdd",
  async (payload: TAddLikePayload) => {
    const newParams: TProductCard = {
      ...payload.product,
      likes: [...payload.product.likes, payload.uid],
    };

    const updatedProduct = await updateProduct_API(
      payload.product.id,
      newParams
    );
    return updatedProduct;
  }
);

export const removeLike = createAsyncThunk(
  "products/likeRemove",
  async (payload: TAddLikePayload) => {
    const newParams: TProductCard = {
      ...payload.product,
      likes: payload.product.likes.filter((id) => id !== payload.uid),
    };

    const updatedProduct = await updateProduct_API(
      payload.product.id,
      newParams
    );

    return updatedProduct;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productCards = action.payload;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.productCards[action.payload.id - 1].likes = action.payload.likes;
        state.fetchings.like = false;
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        state.productCards[action.payload.id - 1].likes = action.payload.likes;
        state.fetchings.like = false;
      })
      .addCase(addLike.pending, (state) => {
        state.fetchings.like = true;
      })
      .addCase(removeLike.pending, (state) => {
        state.fetchings.like = true;
      });
  },
});

export default productsSlice.reducer;

export type TInitialState = typeof initialState;
type TAddLikePayload = {
  product: TProductCard;
  uid: string;
};
export type TProductCharacteristics = {
  categories: TCategoryCode[];
  characteristics?: { [key: string]: string };
};
export type TCategory = { code: TCategoryCode; categoryName: string };
