import instance from "./instance";
import { AxiosResponse } from "axios";

export const getSubCategories_API = async (category: TCategoryCode) => {
  const response: AxiosResponse<{ id: TCategoryCode; data: TSubCategory[] }> =
    await instance.get(`subCategories/${category}`);
  return response.data.data;
};

// * categories' types
export type TCategoryCode = TMainCategoryCode | string;
export type TSubCategory = { code: string };
export type TMainCategoryCode =
  | "beauty_and_health"
  | "sports_and_hobbies"
  | "goods_for_gamers"
  | "household_appliances"
  | "smartphones_tv_and_electronics"
  | "laptops_and_computers";
