import ProductCard from "./ProductCard";

import { TProductCard } from "api/productsAPI";
import { useContext, useEffect } from "react";
import { fetchLikedProductIds } from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import style from "style/productsStyle/products.module.css";
import { User } from "components/contexts/UserContext";
import { useSelector } from "react-redux";
import { getLikedProducts } from "utils/selectors/productSelectors";

const ProductList: React.FC<{ products: TProductCard[] }> = ({ products }) => {
  const dispatch = useAppDispatch();
  const likedProductsIds = useSelector(getLikedProducts)
  const { id } = useContext(User);
  useEffect(() => {
    if (!likedProductsIds.length) {
      dispatch(fetchLikedProductIds());
    }
  }, [id, dispatch, likedProductsIds.length]);

  return (
    <div className={style.productCards}>
      {products.length
        ? products.map((p) => <ProductCard product={p} key={p.id} />)
        : "There is no products"}
    </div>
  );
};

export default ProductList;
