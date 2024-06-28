export const getSale = (price: number, sale: number) => {
  return (price - Math.round(price * sale))
} 