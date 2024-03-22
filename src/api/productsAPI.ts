import { $authHost, $host } from "./instance";

import { TLng } from "types/types";

const productsAPI = {
  createProduct: async ({
    imgs,
    price,
    en,
    ua,
    ru,
    category,
  }: TProductCreateData) => {
    if (!imgs || imgs.length < 2) {
      return Promise.reject({
        message: "images_are_not_2",
      });
    } else if (!category) {
      return Promise.reject({
        message: "category_is_null",
      });
    }

    const formData = new FormData();
    Array.from(imgs || []).forEach((i) => {
      formData.append("img", i);
    })
    formData.append("price", price);
    formData.append("en", en);
    formData.append("ua", ua);
    formData.append("ru", ru);
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
  getAllProducts: async (category: string, pageSize: number, page: number, like?: string, likeLng?: TLng) => {
    try {
      const response = await $host.get<{ count: number; rows: TProductCard[] }>(
        `api/product?page=${page}&pageSize=${pageSize}${
          category !== "all" ? "&category=" + category : ""
        }${like && likeLng ? `&like=${like}&likeLng=${likeLng}` : ""}`
      );
      return response.data;
    } catch (err: any) {
      return Promise.reject(err.response.data);
    }
  },
  getProduct: async (id: number) => {
    try {
      const response = await $host.get<TFullProduct | undefined>(`api/product/${id}`);
      if (!response.data) {
        return Promise.reject({message: "err/product_is_null"})
      }
      return response.data;
    } catch (err: any) {
      return Promise.reject(err.response.data);
    }
  },
  like: async (id: number, method: "ADD" | "REMOVE") => {
    try {
      let response;
      if (method === "ADD") {
        response = await $authHost.post<TProductLikeData>(
          `api/product/like/${id}`
        );
        return response.data;
      } else if (method === "REMOVE") {
        response = await $authHost.delete<TProductLikeData>(
          `api/product/like/${id}`
        );
        return response.data;
      }
    } catch (err: any) {
      return Promise.reject(err.response.data);
    }
  },
  getLikedProductIds: async () => {
    try {
      const response = await $authHost.get<TLikedProductsData>(
        "api/product/liked-ids"
      );
      return response.data;
    } catch (err: any) {
      return Promise.reject(err.response.data);
    }
  },
  updateDescription: async (data: TDescriptionData, productId: number) => {
    try {
      const response = await $authHost.put<TFullProduct>(
        `api/product/${productId}/description`,
        data
      );
      return data
    } catch (err: any) {
      return Promise.reject(err.response.data);
    }
  },
};

export default productsAPI;
export type TProductCard = {
  id: number;
  en: string;
  ua: string;
  ru: string;
  price: number; // integer
  sale: number; // 0-100% ==> 0.00-1.00
  categoryCode: string;
  img: string; // url ~example("img1.jpg/img2.jpg/img3.jpg") ==> to arr: img.split("/")
};
export type TProductCreateData = {
  en: string;
  ua: string;
  ru: string;
  price: string;
  imgs?: File[];
  category: string;
};
export type TProductLikeData = {
  productId: number;
};
export type TLikedProductsData = {
  likedProductIds: number[];
};
export type TFullProduct = TProductCard & {
  rating: number; // 0-5
  likesCount: number;
  descriptionEn: string | null;
  descriptionUa: string | null;
  descriptionRu: string | null;
};
export type TDescriptionData = {
  en: string;
  ru: string;
  ua: string;
};
