import ProductList from "components/Products/ProductList";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchRatedProducts } from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import { getRatedProducts } from "utils/selectors/productSelectors";

const RatedProducts = () => {
  const dispatch = useAppDispatch();
  const ratedProducts = useSelector(getRatedProducts);

  useEffect(() => {
    dispatch(fetchRatedProducts())
  }, [dispatch])

  return (
    <section>
      <ProductList products={ratedProducts} />
    </section>
  );
};

export default RatedProducts;
