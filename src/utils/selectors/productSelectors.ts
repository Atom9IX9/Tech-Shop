import { RootState } from "reducers/store";

export const getProducts = (state: RootState) => state.products.productCards;
export const getFetchings = (state: RootState) => state.products.fetchings;
export const getCategories = (state: RootState) => state.products.categories;
export const getLikedProducts = (state: RootState) =>
  state.products.likedProducts;
export const getProductStatuses = (state: RootState) => state.products.statuses;
export const getCurrentProduct = (state: RootState) =>
  state.products.currentProduct;
export const getCurrentProductId = (state: RootState) =>
  state.products.currentProduct?.id;
export const getIsAllLoaded = (state: RootState) => state.products.isAllLoaded;
export const getViewedProducts = (state: RootState) =>
  state.products.viewedProducts;
export const getRatedProducts = (state: RootState) =>
  state.products.ratedProducts;
