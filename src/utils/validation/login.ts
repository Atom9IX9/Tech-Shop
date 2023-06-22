export const isValidEmail: TValidationFn = (value) => {
  const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return (
    reg.test(value) ||
    "Email is invalid"
  )
}

export type TValidationFn = (fieldValue: string) => string | boolean