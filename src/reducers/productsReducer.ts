import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  TProductCard,
  getProducts_API,
  updateProduct_API,
} from "../api/productsAPI";
import {
  TCategoryCode,
  TMainCategoryCode,
  TSubCategory,
  getSubCategories_API,
} from "../api/categoriesAPI";

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
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const products = await getProducts_API();
    return products;
  }
);
export const fetchSubcategories = createAsyncThunk(
  "products/fetchSubcategories",
  async (category: TCategoryCode) => {
    const subcategories = await getSubCategories_API(category);
    return subcategories;
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
  reducers: {
    setCurrentCategory: (state, action: PayloadAction<TCategoryCode>) => {
      state.currentCategory.code = action.payload;
    },
  },
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
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.currentCategory.subcategories = action.payload;
      });
  },
});

export default productsSlice.reducer;
export const { setCurrentCategory } = productsSlice.actions;

export type TInitialState = typeof initialState;
type TAddLikePayload = {
  product: TProductCard;
  uid: string;
};
export type TProductCharacteristics = {
  categories: TCategoryCode[];
  characteristics?: { [key: string]: string };
};

