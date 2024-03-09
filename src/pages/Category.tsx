import ProductList from "components/Products/ProductList";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import { getProducts } from "utils/selectors/productSelectors";
import style from "style/categoryPageStyle/categoryPageStyle.module.css";

const Subcategories = () => {
  const dispatch = useAppDispatch();
  const { category } = useParams();
  const products = useSelector(getProducts);

  useEffect(() => {
    dispatch(fetchProducts({ category: category || "", page: 1 }));
  }, [dispatch, category]);

  return (
    <div className={style.categoryPage}>
      <div className={style.productListContainer}>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Subcategories;
