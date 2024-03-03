import { TLng } from './../types/types';

import { TMainCategory } from "api/categoriesAPI";
import i18n from "i18n";

export const getCategoryTranslate = (categories: TMainCategory[], code: string) => {
  let translate = "";
  categories.forEach(c => {
    if (c.code === code) {
      translate = c[i18n.language as TLng]
    }
  });
  return translate
}