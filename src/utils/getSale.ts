export const getSale = (price: number, sale: number) => {
  return Math.round(price - price * sale)
} 