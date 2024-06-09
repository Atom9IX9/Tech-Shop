import { TSubcategory } from "./categoriesAPI";
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
    if (!imgs || imgs.length === 0) {
      return Promise.reject({
        message: "images_are_empty",
      });
    } else if (!category) {
      return Promise.reject({
        message: "category_is_null",
      });
    }

    const formData = new FormData();
    Array.from(imgs || []).forEach((i) => {
      formData.append("imgs", i);
    });
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
  getAllProducts: async (
    category: string,
    pageSize: number,
    page: number,
    like?: string,
    likeLng?: TLng
  ) => {
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
  getProduct: async (id: number, userId: number) => {
    try {
      const response = await Promise.all([
        $host.get<TFullProduct | undefined>(`api/product/${id}/user/${userId}`),
        $host.get<TSubcategory[]>(`api/category/productsubcategory/${id}`),
      ]);
      if (!response[0].data) {
        return Promise.reject({ message: "err/product_is_null" });
      }
      return { ...response[0].data, subcategories: response[1].data };
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
      return data;
    } catch (err: any) {
      return Promise.reject(err.response.data);
    }
  },
  getLikedProducts: async () => {
    try {
      const response = await $authHost.get<TProductCard[]>(
        "api/product/liked-products"
      );
      return response.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  },
  addRate: async (productId: number, rate: number) => {
    try {
      const response = await $authHost.post<TRateData>(
        `api/product/rating/${productId}`,
        { rate }
      );
      return response.data;
    } catch (err: any) {
      return Promise.reject(err.response.data);
    }
  },
  getAllWithSubcategory: async (subcategoryCode: string) => {
    try {
      const response = await $host.get<{ count: number; rows: TProductCard[] }>(
        `api/product/subcategory/${subcategoryCode}`
      );
      return response.data;
    } catch (error: any) {
      Promise.reject(error.response.data);
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
  imgs: string; // url ~example("img1.jpg/img2.jpg/img3.jpg") ==> to arr: img.split("/")
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
  rating: {
    average: number;
    user: number;
  }; // 0-5
  likesCount: number;
  descriptionEn: string | null;
  descriptionUa: string | null;
  descriptionRu: string | null;
  subcategories: TSubcategory[];
  addSubcategoryOptions: TSubcategory[];
  isInBasket: boolean;
};
export type TDescriptionData = {
  en: string;
  ru: string;
  ua: string;
};
export type TRateData = {
  rate: number; // 0-5
  productId: number;
  averageRating: number; // (0-5).toFixed(1) as 0.0-5.0
};
