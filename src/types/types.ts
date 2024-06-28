export type TChildren = string | JSX.Element;
export type TLng = "ua" | "ru" | "en";

export type TAboutProduct = {
  likes: number;
  isInBucket: boolean;
  pictures: Array<string>; // url
  grade: number;
};
export type TValidationFn = (fieldValue: string) => string | boolean;


