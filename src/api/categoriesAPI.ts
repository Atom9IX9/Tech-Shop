import { $authHost, $host } from "./instance";

const categoriesAPI = {
  getMainCategories: async () => {
    try {
      const response = await $host.get<TMainCategory[]>("api/category");
      return response.data
    } catch (err: any) {
      return Promise.reject(err.response.data)
    }
  },
  createMainCategory: async (translates: TCategoryTranslates) => {
    const response = await $authHost.post<TMainCategory>("api/category", translates)
    return response.data
  }
};

export default categoriesAPI;
// * categories' types
export type TCategoryCode = TMainCategoryCode;
export type TSubCategory = { code: string };
export type TMainCategoryCode =
  | "all"
  | "beauty_and_health"
  | "sports_and_hobbies"
  | "goods_for_gamers"
  | "household_appliances"
  | "smartphones_tv_and_electronics"
  | "laptops_and_computers";
export type TCategoryTranslates = {
  en: String;
  ua: String;
  ru: String;
}
export type TMainCategory = {
  code: TMainCategoryCode;
} & TCategoryTranslates;
