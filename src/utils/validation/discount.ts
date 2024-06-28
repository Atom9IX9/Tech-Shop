import { TValidationFn } from "types/types";

export const minMaxPercent: TValidationFn = (value) =>
  String(Number(value) >=0 || Number(value) < 100) || "discount/min-max";