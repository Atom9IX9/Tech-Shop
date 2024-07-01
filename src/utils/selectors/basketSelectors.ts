import { RootState } from "reducers/store";

export const getBasketStatuses = (state: RootState) => state.basket.statuses
export const getBasketFetchings = (state: RootState) => state.basket.fetchings
export const getBasketProducts = (state: RootState) => state.basket.basketProducts
export const getBasketId = (state: RootState) => state.basket.basketId
export const getProductsInBasketCount = (state: RootState) => state.basket.basketProductsCount