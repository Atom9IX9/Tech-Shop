export type TChildren = string | JSX.Element;
export type TLng = "ua" | "ru" | "en";

type AboutProduct = {
  likes: number;
  isInBucket: boolean;
  pictures: Array<string>; // url
  grade: number;
};

type ProductCharacteristics = { 
  [key: string]: string;
  category: TCategory;
};
type TCategory = string