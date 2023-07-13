import axios, { AxiosResponse } from "axios";

const products = axios.create({
  baseURL: "http://localhost:3030/products/",
});

export const getProducts_API = async () => {
  const response: AxiosResponse<TProductCard[]> = await products.get("");
  return response.data;
};

export const updateProduct_API = async (
  productId: number,
  params: TProductCard
) => {
  const response: AxiosResponse<TProductCard> = await products.put(
    `${productId}`,
    params
  );
  return response.data;
};

export type TProductCard = {
  id: number;
  title: string;
  price: number; // integer
  sale: number; // 0-100% ==> 0.00-1.00
  categories: TCategoryCode[];
  likes: string[]; // user ids
  picture: string; // url
};
export type TCategoryCode =
  | "all"
  | "cosmetic"
  | "sport"
  | "electric_transport"
  | "electric_transport_accessories"
  | "hair"
  | "shampoo"
  | "household_appliances"
  | "kitchen"
  | "electric_kettles"
  | "headphone";
