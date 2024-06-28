import { TValidationFn } from "types/types";

export const isValidEmail: TValidationFn = (value) => {
  const reg =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return reg.test(value) || "auth/invalid-email";
};

export const noWhitespace: TValidationFn = (value) =>
  value.trim() === value || "auth/whitespace";

