import { RootState } from "./store";

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
  TSubcategory,
  TSubcategoryCreateData,
} from "../api/categoriesAPI";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TLng } from "types/types";

export const initialState = {
  productCards: [] as TProductCard[],
  fetchings: {
    like: false,
    categoryCreating: false,
    subcategoryCreating: false,
    subcategoryFetching: false,
    productCreating: false,
    productOpening: false,
    productDescriptionUpdating: false,
    rating: false,
    productsFetching: false,
    productsFetchingMore: false,
    updatingDiscount: false,
  },
  statuses: {
    categoryCreate: undefined as undefined | "success" | string,
    subcategoryCreate: undefined as undefined | "success" | string,
    subcategoryFetched: undefined as undefined | "success" | string,
    productCreate: undefined as undefined | "success" | string,
    categoryFetched: undefined as undefined | "success" | string,
    productFetchingById: undefined as undefined | "success" | string,
    productDescriptionUpdating: undefined as undefined | "success" | string,
    productsFetched: undefined as undefined | "success" | string,
    discountUpdated: undefined as undefined | "success" | string,
  },
  categories: [] as TMainCategory[],
  page: 1,
  pageSize: 21,
  likedProducts: [] as number[], // products' id
  currentProduct: undefined as undefined | TFullProduct,
  isAllLoaded: false,
  viewedProducts: [] as TProductCard[],
  ratedProducts: [] as TProductCard[],
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
      return { products, page };
    } catch (e) {
      const err = e as { message: string };
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMoreProducts = createAsyncThunk<
  { count: number; rows: TProductCard[] },
  Omit<TFetchPostsPayload, "page">,
  { state: RootState }
>(
  "products/fetchMoreProducts",
  async ({ category, like, likeLng }, { rejectWithValue, getState }) => {
    try {
      const products = await productsAPI.getAllProducts(
        category,
        initialState.pageSize,
        getState().products.page + 1,
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

export const fetchProductsWithSubcategory = createAsyncThunk(
  "products/fetchProductsWithSubcategory",
  async (subcategory: string, { rejectWithValue }) => {
    try {
      const products = await productsAPI.getAllWithSubcategory(subcategory);
      return products;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentProduct = createAsyncThunk(
  "products/fetchOneProduct",
  async ({ id, userId }: FetchProductData, { rejectWithValue }) => {
    try {
      const product = await productsAPI.getProduct(id, userId);
      productsAPI.viewProduct(id);
      return product;
    } catch (e) {
      const err = e as { message: string };
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSubcategories = createAsyncThunk(
  "products/fetchSubcategories",
  async (
    { categoryCode, order }: TFetchSubcategoriesThunkData,
    { rejectWithValue }
  ) => {
    try {
      const subcategories = await categoriesAPI.getSubcategoriesWithCategory(
        categoryCode,
        order
      );
      return subcategories;
    } catch (error: any) {
      return rejectWithValue(error.message);
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

export const createSubcategory = createAsyncThunk(
  "products/createSubcategory",
  async (createData: TSubcategoryCreateData, thunk) => {
    try {
      const subcategory = await categoriesAPI.createSubcategory(createData);
      return subcategory;
    } catch (error: any) {
      return thunk.rejectWithValue(error.message);
    }
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ afterCreate, data }: TCreateProductPayload, thunk) => {
    try {
      const product = await productsAPI.createProduct(data);
      if (afterCreate) {
        afterCreate(product)
      }
      return product;
    } catch (error: any) {
      return thunk.rejectWithValue(error.message);
    }
  }
);

export const updateProductDescription = createAsyncThunk(
  "products/updateDescription",
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
  "products/likeProduct",
  async ({ id, method }: TLikeProductPayload) => {
    const likedProduct = (await productsAPI.like(
      id,
      method
    )) as TProductLikeData;
    return { likedProduct, method };
  }
);

export const addRating = createAsyncThunk(
  "products/addRating",
  async ({ rate, productId }: TAddRatingData, { rejectWithValue }) => {
    try {
      const data = await productsAPI.addRate(productId, rate);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLikedProductIds = createAsyncThunk(
  "products/fetchLikedProductIds",
  async () => {
    const likedProductIds = await productsAPI.getLikedProductIds();
    return likedProductIds.likedProductIds;
  }
);

export const deleteCategory = createAsyncThunk(
  "products/deleteCategory",
  async (categoryCode: string, { rejectWithValue }) => {
    try {
      await categoriesAPI.deleteCategory(categoryCode);
      return categoryCode;
    } catch (e) {
      const err = e as { message: string };
      return rejectWithValue(err.message);
    }
  }
);

export const setDiscount = createAsyncThunk(
  "products/setDiscount",
  async (
    { productId, discountPercent, dropTo }: TSetDiscountData,
    { rejectWithValue }
  ) => {
    try {
      const data = await productsAPI.setDiscount(
        productId,
        discountPercent,
        dropTo
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProductSubcategory = createAsyncThunk(
  "products/createProductSubcategory",
  async (payload: TCreateProductSubcategoryPayload, { rejectWithValue }) => {
    try {
      await categoriesAPI.createProductSubcategory(
        payload.subcategory.code,
        payload.productId
      );
      return { ...payload.subcategory, order: payload.order };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchViewedProducts = createAsyncThunk(
  "products/fetchViewedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const products = await productsAPI.getViewedProducts();
      return products;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRatedProducts = createAsyncThunk(
  "products/fetchRatedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const products = await productsAPI.getRatedProducts()
      return products
    } catch (error: any) {
      return rejectWithValue(error.message)
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
      state.statuses.subcategoryCreate = undefined;
      state.statuses.subcategoryFetched = undefined;
      state.statuses.categoryFetched = undefined;
    },
    setIsInBasket: (state, action: PayloadAction<boolean>) => {
      if (state.currentProduct) {
        state.currentProduct.isInBasket = action.payload;
      }
    },
    resetDiscountStatus: (state) =>
      (state.statuses.discountUpdated = undefined),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productCards = action.payload.products.rows;
        state.fetchings.productsFetching = false;
        state.page = action.payload.page;
        if (state.productCards.length === action.payload.products.count) {
          state.isAllLoaded = true;
        } else {
          state.isAllLoaded = false;
        }
      })
      .addCase(fetchMoreProducts.fulfilled, (state, action) => {
        if (action.payload.rows.length) {
          state.productCards = [...state.productCards, ...action.payload.rows];
          state.page = state.page + 1;
        }
        state.fetchings.productsFetchingMore = false;
        if (state.productCards.length === action.payload.count) {
          state.isAllLoaded = true;
        } else {
          state.isAllLoaded = false;
        }
      })
      .addCase(fetchProducts.pending, (state, action) => {
        state.fetchings.productsFetching = true;
      })
      .addCase(fetchMoreProducts.pending, (state, action) => {
        state.fetchings.productsFetchingMore = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.fetchings.productsFetching = false;
      })
      .addCase(fetchMoreProducts.rejected, (state, action) => {
        state.fetchings.productsFetchingMore = false;
      })
      .addCase(fetchProductsWithSubcategory.fulfilled, (state, action) => {
        state.productCards = action.payload?.rows || [];
        state.fetchings.productsFetching = false;
      })
      .addCase(fetchProductsWithSubcategory.pending, (state, action) => {
        state.fetchings.productsFetching = true;
      })
      .addCase(fetchProductsWithSubcategory.rejected, (state, action) => {
        state.fetchings.productsFetching = false;
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
      .addCase(createSubcategory.fulfilled, (state, action) => {
        state.fetchings.subcategoryCreating = false;
        state.statuses.subcategoryCreate = "success";
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
      .addCase(createSubcategory.pending, (state) => {
        state.fetchings.subcategoryCreating = true;
        state.statuses.subcategoryCreate = undefined;
      })
      .addCase(createProduct.pending, (state) => {
        state.fetchings.productCreating = true;
        state.statuses.productCreate = undefined;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.fetchings.categoryCreating = false;
        state.statuses.categoryCreate = action.payload as string;
      })
      .addCase(createSubcategory.rejected, (state, action) => {
        state.fetchings.subcategoryCreating = false;
        state.statuses.subcategoryCreate = action.payload as string;
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
          state.currentProduct.rating.average = action.payload.averageRating;
          state.currentProduct.rating.user = action.payload.rate;
          state.fetchings.rating = false;
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        if (state.currentProduct) {
          state.fetchings.rating = false;
          alert(action.payload as string);
        }
      })
      .addCase(addRating.pending, (state, action) => {
        if (state.currentProduct) {
          state.fetchings.rating = true;
        }
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.fetchings.subcategoryFetching = false;
        state.statuses.subcategoryFetched = "success";
        let subcategoriesForAdding: TSubcategory[] = action.payload;
        if (state.currentProduct) {
          state.currentProduct.addSubcategoryOptions = subcategoriesForAdding;
        }
      })
      .addCase(fetchSubcategories.pending, (state) => {
        state.fetchings.subcategoryFetching = true;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.fetchings.subcategoryFetching = false;
        state.statuses.subcategoryFetched = action.payload as string;
      })
      .addCase(createProductSubcategory.fulfilled, (state, action) => {
        if (state.currentProduct) {
          state.currentProduct.subcategories = [
            ...state.currentProduct.subcategories,
            action.payload,
          ];
        }
      })
      .addCase(createProductSubcategory.rejected, (state, action) => {
        state.statuses.subcategoryCreate = action.payload as string;
      })
      .addCase(setDiscount.fulfilled, (state, action) => {
        if (state.currentProduct) {
          state.currentProduct.sale = action.payload.discount;
          state.currentProduct.priceWithDiscount =
            Number(action.payload.priceWithDiscount) || null;
          if (action.payload.discount === 0) {
            state.statuses.discountUpdated = undefined;
          } else {
            state.statuses.discountUpdated = "success";
          }
        }
        state.fetchings.updatingDiscount = false;
      })
      .addCase(setDiscount.pending, (state) => {
        state.fetchings.updatingDiscount = true;
      })
      .addCase(setDiscount.rejected, (state, action) => {
        state.fetchings.updatingDiscount = false;
        state.statuses.discountUpdated = action.payload as string;
      })
      .addCase(fetchViewedProducts.fulfilled, (state, action) => {
        state.viewedProducts = action.payload;
        state.fetchings.productsFetching = false;
        state.statuses.productsFetched = "success";
      })
      .addCase(fetchViewedProducts.pending, (state) => {
        state.fetchings.productsFetching = true;
      })
      .addCase(fetchViewedProducts.rejected, (state, action) => {
        state.fetchings.productsFetching = false;
        state.statuses.productsFetched = action.payload as string;
      })
      .addCase(fetchRatedProducts.fulfilled, (state, action) => {
        state.ratedProducts = action.payload
        state.statuses.productsFetched = "success"
        state.fetchings.productsFetching = false
      })
      .addCase(fetchRatedProducts.pending, (state) => {
        state.fetchings.productsFetching = true
      })
      .addCase(fetchRatedProducts.rejected, (state, action) => {
        state.fetchings.productsFetching = false
        state.statuses.productsFetched = action.payload as string
      })
  },
});

export default productsSlice.reducer;
export const {
  resetLikedProducts,
  resetCreateStatuses,
  setIsInBasket,
  resetDiscountStatus,
} = productsSlice.actions;

export type TInitialState = typeof initialState;

export type TProductCharacteristics = {
  categories: string[];
  characteristics?: { [key: string]: string };
};
export type TFetchPostsPayload = {
  category: string;
  page: number;
  like?: string;
  likeLng?: TLng;
};
export type TLikeProductPayload = {
  id: number;
  method: "ADD" | "REMOVE";
};
export type TUpdateProductDescriptionThunkData = {
  productId: number;
  data: TDescriptionData;
};
export type FetchProductData = {
  id: number;
  userId: number;
};
export type TAddRatingData = {
  rate: number;
  productId: number;
};
export type TCreateProductSubcategoryPayload = {
  subcategory: TSubcategory;
  productId: number;
  order: number;
};
export type TSetDiscountData = {
  productId: number;
  dropTo?: number;
  discountPercent?: number;
};
export type TFetchSubcategoriesThunkData = {
  categoryCode: string;
  order?: number;
};
export type TCreateProductPayload = {
  data: TProductCreateData,
  afterCreate?: (product: TProductCard) => void
}
