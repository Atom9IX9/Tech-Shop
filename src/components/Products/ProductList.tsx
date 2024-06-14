import ProductCard from "./ProductCard";

import { TProductCard } from "api/productsAPI";
import { useContext, useEffect } from "react";
import { fetchLikedProductIds } from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import style from "style/productsStyle/products.module.css";
import { User } from "components/contexts/UserContext";
import { useSelector } from "react-redux";
import {
  getFetchings,
  getLikedProducts,
} from "utils/selectors/productSelectors";
import Loader from "components/Loader/Loader";

const ProductList: React.FC<{ products: TProductCard[] }> = ({ products }) => {
  const dispatch = useAppDispatch();
  const likedProductsIds = useSelector(getLikedProducts);
  const { id } = useContext(User);
  useEffect(() => {
    if (!likedProductsIds.length) {
      dispatch(fetchLikedProductIds());
    }
  }, [id, dispatch, likedProductsIds.length]);
  const fetchings = useSelector(getFetchings);

  return (
    <div className={style.productCardsContainer} style={{
      height: fetchings.productsFetching ? "90vh" : "min-content"
    }}>
      {fetchings.productsFetching ? (
        <Loader />
      ) : (
        <div className={style.productCards}>
          {products.length
            ? products.map((p) => <ProductCard product={p} key={p.id} />)
            : "There is no products"}
        </div>
      )}
    </div>
  );
};

export default ProductList;
