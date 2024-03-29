import productsAPI, {
  TDescriptionData,
  TFullProduct,
  TProductCard,
  TProductCreateData,
  TProductLikeData,
} from "../api/productsAPI";
import categoriesAPI, {
  CategoryCreateData,
  TMainCategory,
} from "../api/categoriesAPI";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TLng } from "types/types";

export const initialState = {
  productCards: [] as TProductCard[],
  fetchings: {
    like: false,
    categoryCreating: false,
    productCreating: false,
    productOpening: false,
    productDescriptionUpdating: false,
  },
  statuses: {
    categoryCreate: undefined as undefined | "success" | string,
    productCreate: undefined as undefined | "success" | string,
    categoryFetched: undefined as undefined | "success" | string,
    productFetchingById: undefined as undefined | "success" | string,
    productDescriptionUpdating: undefined as undefined | "success" | string,
  },
  categories: [] as TMainCategory[],
  page: 1,
  pageSize: 20,
  likedProducts: [] as number[], // products' id
  currentProduct: undefined as undefined | TFullProduct,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    { page, category, like, likeLng }: TFetchPostsPayload,
    { rejectWithValue }
  ) => {
    try {
      const products = await productsAPI.getAllProducts(
        category,
        initialState.pageSize,
        page,
        like,
        likeLng
      );
      return products;
    } catch (e) {
      const err = e as { message: string };
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCurrentProduct = createAsyncThunk(
  "products/fetchOneProduct",
  async ({ id, userId }: FetchProductData, { rejectWithValue }) => {
    try {
      const product = await productsAPI.getProduct(id, userId);
      return product;
    } catch (e) {
      const err = e as { message: string };
      return rejectWithValue(err.message);
    }
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

export const updateProductDescription = createAsyncThunk(
  "product/updateDescription",
  async (
    { productId, data }: TUpdateProductDescriptionThunkData,
    { rejectWithValue }
  ) => {
    try {
      const product = await productsAPI.updateDescription(data, productId);
      return product;
    } catch (error: any) {
      return rejectWithValue(error.message);
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
// todo: rating update request; rating.rejected + rating.pending; rating statuses/fetchings;
export const addRating = createAsyncThunk(
  "product/addRating",
  async ({ rate, productId }: TAddRatingData, { rejectWithValue }) => {
    try {
      const data = productsAPI.addRate(productId, rate)
      return data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

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
    resetLikedProducts: (state) => {
      state.likedProducts = [];
    },
    resetCreateStatuses: (state) => {
      state.statuses.productCreate = undefined;
      state.statuses.categoryCreate = undefined;
    },
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
      .addCase(likeProduct.pending, (state) => {
        state.fetchings.like = true;
      })
      .addCase(likeProduct.rejected, (state) => {
        state.fetchings.like = false;
      })
      .addCase(likeProduct.fulfilled, (state, action) => {
        const likeId = Number(action.payload.likedProduct.productId);
        state.fetchings.like = false;
        if (action.payload.method === "ADD") {
          state.likedProducts = [...state.likedProducts, likeId];
          if (state.currentProduct?.id === likeId) {
            state.currentProduct.likesCount += 1;
          }
        } else if (action.payload.method === "REMOVE") {
          state.likedProducts = state.likedProducts.filter(
            (id) => id !== likeId
          );
          if (state.currentProduct?.id === likeId) {
            state.currentProduct.likesCount -= 1;
          }
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
      })
      .addCase(fetchCurrentProduct.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
        state.fetchings.productOpening = false;
      })
      .addCase(fetchCurrentProduct.pending, (state) => {
        state.fetchings.productOpening = true;
      })
      .addCase(fetchCurrentProduct.rejected, (state, action) => {
        state.fetchings.productOpening = false;
        state.statuses.productFetchingById = action.payload as string;
      })
      .addCase(updateProductDescription.fulfilled, (state, action) => {
        state.fetchings.productDescriptionUpdating = false;
        if (state.currentProduct) {
          state.currentProduct.descriptionEn = action.payload.en;
          state.currentProduct.descriptionRu = action.payload.ru;
          state.currentProduct.descriptionUa = action.payload.ua;
        }
        state.statuses.productDescriptionUpdating = "success";
      })
      .addCase(updateProductDescription.pending, (state, action) => {
        state.fetchings.productDescriptionUpdating = true;
        state.statuses.productDescriptionUpdating = undefined;
      })
      .addCase(updateProductDescription.rejected, (state, action) => {
        state.fetchings.productDescriptionUpdating = false;
        state.statuses.productDescriptionUpdating = action.payload as string;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        if (state.currentProduct) {
          state.currentProduct.rating.average = action.payload.averageRating
          state.currentProduct.rating.user = action.payload.rate
        }
      })
  },
});

export default productsSlice.reducer;
export const { resetLikedProducts, resetCreateStatuses } =
  productsSlice.actions;

export type TInitialState = typeof initialState;

export type TProductCharacteristics = {
  categories: string[];
  characteristics?: { [key: string]: string };
};
type TFetchPostsPayload = {
  category: string;
  page: number;
  like?: string;
  likeLng?: TLng;
};
type TLikeProductPayload = {
  id: number;
  method: "ADD" | "REMOVE";
};
type TUpdateProductDescriptionThunkData = {
  productId: number;
  data: TDescriptionData;
};
type FetchProductData = {
  id: number;
  userId: number;
};
type TAddRatingData = {
  rate: number;
  productId: number;
};
