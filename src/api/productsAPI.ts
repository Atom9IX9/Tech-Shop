import { TCategoryCode } from "./categoriesAPI";
import { $authHost, $host } from "./instance";

const productsAPI = {
  createProduct: async ({ img, price, title, category }: TProductCreateData) => {
    const formData = new FormData();
    formData.append("img", img);
    formData.append("price", price);
    formData.append("title", title);
    formData.append("categoryCode", category);
    try {
      const response = await $authHost.post<TProductCard>(
        "api/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err: any) {
      return Promise.reject(err.response.data);
    }
  },
  getAllProducts: async (category: TCategoryCode, pageSize: number, page: number) => {
    try {
      const response = await $host.get<{count: number, rows: TProductCard[]}>(
        `api/product?page=${page}&pageSize=${pageSize}${
          category !== "all" ? "&category=" + category : ""
        }`
      );
      return response.data;
    } catch (err: any) {
      return Promise.reject(err.response.data);
    }
  },
  getProduct: async (id: number) => {
    try {
      const response = await $host.get<TProductCard>(`api/product/${id}`);
      return response.data;
    } catch (err: any) {
      return Promise.reject(err.response.data);
    }
  },
};

export default productsAPI;
export type TProductCard = {
  id: number;
  title: string;
  price: number; // ? integer
  sale: number; // ? 0-100% ==> 0.00-1.00
  rating: number; // ? 0-5
  categoryCode: TCategoryCode;
  img: string; // ? url
};
export type TProductCreateData = {
  title: string;
  price: string;
  img: File;
  category: TCategoryCode
};
