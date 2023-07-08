import { RootState } from "../../reducers/store";

export const getProducts = (state: RootState) => state.products.productCards;
export const getFetchings = (state: RootState) => state.products.fetchings;
