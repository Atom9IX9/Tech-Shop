import ProductList from "components/Products/ProductList";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import {
  fetchProducts,
  fetchProductsWithSubcategory,
} from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import { getProducts } from "utils/selectors/productSelectors";
import style from "style/categoryPageStyle/categoryPageStyle.module.css";
import { useTranslation } from "react-i18next";
import { TLng } from "types/types";

const Subcategories = () => {
  const dispatch = useAppDispatch();
  const { category, subcategory } = useParams();
  const products = useSelector(getProducts);

  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!subcategory) {
      dispatch(
        fetchProducts({
          category: category || "",
          page: 1,
          like: searchParams.get("query") || "",
          likeLng: i18n.language as TLng,
        })
      );
    } else {
      dispatch(fetchProductsWithSubcategory(subcategory));
    }
  }, [dispatch, category, subcategory, searchParams, i18n.language]);

  return (
    <div className={style.categoryPage}>
      <div className={style.productListContainer}>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Subcategories;
