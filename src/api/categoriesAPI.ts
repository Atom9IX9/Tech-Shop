import { $authHost, $host } from "./instance";

import { AxiosError } from "axios";

const categoriesAPI = {
  getMainCategories: async () => {
    try {
      const response = await $host.get<TMainCategory[]>("api/category");
      return response.data;
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      return Promise.reject(err.response?.data);
    }
  },
  createMainCategory: async (data: CategoryCreateData) => {
    if (!data.icon) {
      return Promise.reject({
        response: {
          data: {
            message: "icon_is_null",
          },
        },
      });
    }

    const formData = new FormData();
    formData.append("icon", data.icon);
    formData.append("en", data.en);
    formData.append("ru", data.ru);
    formData.append("ua", data.ua);
    try {
      const response = await $authHost.post<TMainCategory>(
        "api/category",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return Promise.reject(error);
    }
  },
  deleteCategory: async (categoryCode: string) => {
    try {
      const response = await $authHost.delete<{ deleted: boolean }>(
        `api/category/${categoryCode}`
      );
      return response.data;
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      return Promise.reject(err.response?.data);
    }
  },
};

export default categoriesAPI;
// * categories' types
export type TSubCategory = { code: string };
export type TCategoryTranslates = {
  en: string;
  ua: string;
  ru: string;
};
export type TMainCategory = {
  code: string;
} & TCategoryTranslates & {
    icon: string;
  };
export type CategoryCreateData = TCategoryTranslates & { icon?: File };
