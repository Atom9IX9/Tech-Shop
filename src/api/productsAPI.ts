import instance from "./instance";
import { TCategoryCode } from "./categoriesAPI";

import { AxiosResponse } from "axios";

export const getProducts_API = async () => {
  const response: AxiosResponse<TProductCard[]> = await instance.get(
    "products"
  );
  return response.data;
};

export const updateProduct_API = async (
  productId: number,
  params: TProductCard
) => {
  const response: AxiosResponse<TProductCard> = await instance.put(
    `products/${productId}`,
    params
  );
  return response.data;
};

export type TProductCard = {
  id: number;
  title: string;
  price: number; // ? integer
  sale: number; // ? 0-100% ==> 0.00-1.00
  categories: TCategoryCode[];
  likes: string[]; // ? user ids
  picture: string; // ? url
};
