import { AxiosResponse } from "axios";
import instance from "./instance";

export const getSubCategories_API = async (category: TCategoryCode) => {
  const response: AxiosResponse<{ id: TCategoryCode; data: TSubcategory[] }> =
    await instance.get(`subCategories/${category}`);
  return response.data.data;
};

// * categories' types
export type TCategoryCode = TMainCategoryCode | SubcategoryCode;
// ** subcategories
export type TSubcategory = { code: SubcategoryCode; name: string } | null;
export type SubcategoryCode =
  | TSportSubcategoryCode
  | TCosmeticSubcategoryCode
  | THouseholdAppliancesSubcategoryCode
  | TPhonesSubcategoryCode;
export type TMainCategoryCode =
  | "all"
  | "cosmetic"
  | "sport"
  | "household_appliances"
  | "phones";
export type TSportSubcategoryCode =
  | "electric_transport"
  | "electric_transport_accessories";
export type TCosmeticSubcategoryCode = "hair" | "shampoo";
export type THouseholdAppliancesSubcategoryCode =
  | "electric_kettles"
  | "kitchen";
export type TPhonesSubcategoryCode = "headphone";
