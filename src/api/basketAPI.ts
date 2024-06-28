import { $authHost } from "./instance";

const basketAPI = {
  createBasket: async () => {
    try {
      const response = await $authHost.post<TBasket>("api/basket");
      return response.data;
    } catch (error: any) {
      return Promise.reject(error.response.error);
    }
  },
  getBasket: async () => {
    try {
      const response = await $authHost.get<TBasket>("api/basket");
      return response.data;
    } catch (error: any) {
      return Promise.reject(error.response.error);
    }
  },
  createBasketProduct: async (productId: number, basketId: number) => {
    try {
      const response = await $authHost.post(`api/basket/product`, {
        productId,
        basketId,
      });
      return response.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  },
  getBasketProducts: async (basketId: number) => {
    try {
      const response = await $authHost.get<TBasketProduct[]>(
        `api/basket/${basketId}/products`
      );
      return response.data;
    } catch (error: any) {
      return Promise.reject(error.response.message);
    }
  },
  setBasketProductCount: async (count: number, productId: number) => {
    try {
      const response = await $authHost.put<TBasketProduct>(
        `api/basket/product/${productId}/count`,
        { count }
      );
      return response.data
    } catch (error) {}
  },
};

export default basketAPI;
export type TBasket = {
  id: number;
  userId: number;
};
export type TBasketProduct = {
  en: string;
  ua: string;
  ru: string;
  price: number;
  priceWithDiscount: number | null
  sale: number;
  imgs: string;
  id: number;
  count: number;
};
