import { RootState } from "./store";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import basketAPI, { TBasket, TBasketProduct } from "api/basketAPI";

const initialState = {
  basketId: null as null | number,
  basketProducts: [] as TBasketProduct[],
  basketProductsCount: 0,
  statuses: {
    basketProductCreated: undefined as undefined | string,
    basketProductsFetched: undefined as undefined | string,
  },
  fetchings: {
    basketProductCreating: false,
    basketProductsFetching: false,
  },
};

export const setBasket = createAsyncThunk("basket/setBasket", async () => {
  try {
    let basket: TBasket | null = null;
    basket = await basketAPI.getBasket();
    if (!basket) {
      basket = await basketAPI.createBasket();
    }
    return basket;
  } catch (err) {}
});

export const createBasketProduct = createAsyncThunk<
  void,
  number,
  { state: RootState; rejectedValue: string }
>(
  "basket/createBasketProduct",
  async (productId: number, { rejectWithValue, getState }) => {
    try {
      const basketId = getState().basket.basketId;
      if (!basketId) {
        return rejectWithValue("basketId_is_null");
      }
      const product = await basketAPI.createBasketProduct(productId, basketId);
      return product;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchBasketProducts = createAsyncThunk<
  TBasketProduct[],
  void,
  { state: RootState; rejectedValue: string }
>("basket/getProducts", async (_, { rejectWithValue, getState }) => {
  try {
    const basketId = getState().basket.basketId;
    let products = [];
    if (basketId) {
      products = await basketAPI.getBasketProducts(basketId);
      return products;
    } else {
      return rejectWithValue("basketId_is_null");
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const setBasketProductCount = createAsyncThunk(
  "basket/setCount",
  async ({ count, productId }: TSetCountData) => {
    await basketAPI.setBasketProductCount(count, productId);
    return { count, productId };
  }
);

export const deleteBasketProduct = createAsyncThunk(
  "basket/deleteProduct",
  async (productId: number, { rejectWithValue }) => {
    try {
      const basketProductId = await basketAPI.deleteBasketProduct(productId);
      return basketProductId;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
);

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    resetBasketProducts: (state) => {
      state.basketProducts = [];
    },
    resetCreatedStatus: (state) => {
      state.statuses.basketProductCreated = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setBasket.fulfilled, (state, action) => {
        state.basketId = action.payload?.id || null;
        state.basketProductsCount = action.payload?.productsInBasket || 0;
      })
      .addCase(createBasketProduct.fulfilled, (state) => {
        state.fetchings.basketProductCreating = false;
        state.statuses.basketProductCreated = "success";
        state.basketProductsCount += 1;
      })
      .addCase(createBasketProduct.rejected, (state, action) => {
        state.fetchings.basketProductCreating = false;
        state.statuses.basketProductCreated = action.payload as string;
      })
      .addCase(createBasketProduct.pending, (state) => {
        state.fetchings.basketProductCreating = true;
      })
      .addCase(fetchBasketProducts.pending, (state) => {
        state.fetchings.basketProductsFetching = true;
      })
      .addCase(fetchBasketProducts.rejected, (state, action) => {
        state.fetchings.basketProductsFetching = false;
        state.statuses.basketProductsFetched = action.payload as string;
      })
      .addCase(fetchBasketProducts.fulfilled, (state, action) => {
        state.fetchings.basketProductsFetching = false;
        state.statuses.basketProductsFetched = "success";
        state.basketProducts = action.payload;
      })
      .addCase(setBasketProductCount.fulfilled, (state, action) => {
        state.basketProducts.forEach((bp) => {
          if (bp.id === action.payload.productId) {
            bp.count = action.payload.count;
          }
        });
      })
      .addCase(deleteBasketProduct.fulfilled, (state, action) => {
        state.basketProducts = state.basketProducts.filter(
          (bp) => bp.id !== action.payload
        );
        state.basketProductsCount -= 1;
      });
  },
});

export default basketSlice.reducer;
export const { resetBasketProducts, resetCreatedStatus } = basketSlice.actions;
export type TInitialState = typeof initialState;
export type TSetCountData = {
  count: number;
  productId: number;
};
