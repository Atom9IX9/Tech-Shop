import ProductList from "components/Products/ProductList";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchViewedProducts } from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import { getViewedProducts } from "utils/selectors/productSelectors";

const ViewedProducts = () => {
  const dispatch = useAppDispatch()
  const viewedProducts = useSelector(getViewedProducts)

  useEffect(() => {
    dispatch(fetchViewedProducts())
  }, [dispatch]);

  return (
    <section>
      <ProductList products={viewedProducts} />
    </section>
  );
};

export default ViewedProducts;