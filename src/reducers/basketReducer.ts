import { RootState } from "./store";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import basketAPI, { TBasket } from "api/basketAPI";
import { TProductCard } from "api/productsAPI";

const initialState = {
  basketId: null as null | number,
  basketProducts: [] as TProductCard[],
  statuses: {
    basketProductCreated: undefined as undefined | string,
  },
  fetchings: {
    basketProductCreating: false,
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

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    resetBasketProducts: (state) => {
      state.basketProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setBasket.fulfilled, (state, action) => {
        state.basketId = action.payload?.id || null;
      })
      .addCase(createBasketProduct.fulfilled, (state) => {
        state.fetchings.basketProductCreating = false;
        state.statuses.basketProductCreated = "success";
      })
      .addCase(createBasketProduct.rejected, (state, action) => {
        state.fetchings.basketProductCreating = false;
        state.statuses.basketProductCreated = action.payload as string;
      })
      .addCase(createBasketProduct.pending, (state, action) => {
        state.fetchings.basketProductCreating = true;
      })
  },
});

export default basketSlice.reducer;
export const { resetBasketProducts } = basketSlice.actions;
export type TInitialState = typeof initialState;
