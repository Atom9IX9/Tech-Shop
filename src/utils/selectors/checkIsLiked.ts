export const checkLiked = (productId: number, likedProducts: number[]) => {
  if (likedProducts.includes(productId)) return true;
  else return false;
};
