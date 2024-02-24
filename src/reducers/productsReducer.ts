import productsAPI, {
  TProductCard,
  TProductCreateData,
  TProductLikeData,
} from "../api/productsAPI";
import categoriesAPI, {
  CategoryCreateData,
  TMainCategory,
} from "../api/categoriesAPI";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  productCards: [] as TProductCard[],
  fetchings: {
    like: false,
    categoryCreating: false,
    productCreating: false,
  },
  statuses: {
    categoryCreate: undefined as undefined | "success" | string,
    productCreate: undefined as undefined | "success" | string,
    categoryFetched: undefined as undefined | "success" | string,
  },
  categories: [] as TMainCategory[],
  currentCategory: null as TMainCategory | null,
  page: 1,
  pageSize: 20,
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
  async (_, { rejectWithValue }) => {
    try {
      const categories = await categoriesAPI.getMainCategories();
      return categories;
    } catch (e) {
      const err = e as { message: string };
      return rejectWithValue(err.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "products/createCategory",
  async (createData: CategoryCreateData, thunk) => {
    try {
      const category = await categoriesAPI.createMainCategory(createData);
      return category;
    } catch (error: any) {
      return thunk.rejectWithValue(error.response.data.message);
    }
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (createData: TProductCreateData, thunk) => {
    try {
      const product = await productsAPI.createProduct(createData);
      return product;
    } catch (error: any) {
      return thunk.rejectWithValue(error.message);
    }
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

export const deleteCategory = createAsyncThunk(
  "product/deleteCategory",
  async (categoryCode: string, { rejectWithValue }) => {
    try {
      const isDeleted = await categoriesAPI.deleteCategory(categoryCode);
      return categoryCode;
    } catch (e) {
      const err = e as { message: string };
      return rejectWithValue(err.message);
    }
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
      state.likedProducts = [];
    },
    resetCreateStatuses: (state) => {
      state.statuses.productCreate = undefined;
      state.statuses.categoryCreate = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productCards = action.payload.rows;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.statuses.categoryFetched = "success";
      })
      .addCase(
        fetchCategories.rejected,
        (state, action: PayloadAction<any>) => {
          state.statuses.categoryFetched = action.payload;
        }
      )
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
        state.likedProducts = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories = [...state.categories, action.payload];
        state.fetchings.categoryCreating = false;
        state.statuses.categoryCreate = "success";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.productCards = [...state.productCards, action.payload];
        state.fetchings.productCreating = false;
        state.statuses.productCreate = "success";
      })
      .addCase(createCategory.pending, (state) => {
        state.fetchings.categoryCreating = true;
        state.statuses.categoryCreate = undefined;
      })
      .addCase(createProduct.pending, (state) => {
        state.fetchings.productCreating = true;
        state.statuses.productCreate = undefined;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.fetchings.categoryCreating = false;
        state.statuses.categoryCreate = action.payload as string;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.fetchings.productCreating = false;
        state.statuses.productCreate = action.payload as string;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (c) => c.code !== action.payload
        );
      });
  },
});

export default productsSlice.reducer;
export const { setCurrentCategory, resetLikedProducts, resetCreateStatuses } = productsSlice.actions;

export type TInitialState = typeof initialState;

export type TProductCharacteristics = {
  categories: string[];
  characteristics?: { [key: string]: string };
};
type TFetchPostsPayload = {
  category: string;
  page: number;
};
type TLikeProductPayload = {
  id: number;
  method: "ADD" | "REMOVE";
};
