import { RootState } from "reducers/store";

export const getProducts = (state: RootState) => state.products.productCards;
export const getFetchings = (state: RootState) => state.products.fetchings;
export const getCategories = (state: RootState) => state.products.categories;
export const getCurrentCategory = (state: RootState) =>
  state.products.currentCategory;
export const getLikedProducts = (state: RootState) => state.products.likedProducts;
export const getProductStatuses = (state: RootState) => state.products.statuses;