import ProductList from "components/Products/ProductList";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts, fetchProductsWithSubcategory } from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import { getProducts } from "utils/selectors/productSelectors";
import style from "style/categoryPageStyle/categoryPageStyle.module.css";
import productsAPI from "api/productsAPI";

const Subcategories = () => {
  const dispatch = useAppDispatch();
  const { category, subcategory } = useParams();
  let products = useSelector(getProducts);

  useEffect(() => {
    if (!subcategory) {
      dispatch(fetchProducts({ category: category || "", page: 1 }));
    } else {
      dispatch(fetchProductsWithSubcategory(subcategory))
    }
  }, [dispatch, category, subcategory]);

  return (
    <div className={style.categoryPage}>
      <div className={style.productListContainer}>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Subcategories;
