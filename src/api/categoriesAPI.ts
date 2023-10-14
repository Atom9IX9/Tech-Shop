import { $authHost, $host } from "./instance";

const categoriesAPI = {
  getMainCategories: async () => {
    try {
      const response = await $host.get<TMainCategory[]>("api/category");
      return response.data;
    } catch (err: any) {
      return Promise.reject(err.response.data);
    }
  },
  createMainCategory: async (data: CategoryCreateData) => {
    if (!data.icon) {
      return Promise.reject({
        response: {
          data: {
            message: "err/icon_is_null"
          }
        }
      })
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
export type CategoryCreateData = TCategoryTranslates & { icon?: File }
