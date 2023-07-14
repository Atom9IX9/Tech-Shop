import { useEffect } from "react";
import { fetchProducts } from "../reducers/productsReducer";
import { useAppDispatch } from "../reducers/store";
import { useSelector } from "react-redux";
import {
  getCategories,
  getProducts,
} from "../utils/selectors/productSelectors";
import ProductCard from "../components/Products/ProductCard";
import style from "../style/homeStyle/page.module.css";
import Category from "../components/Products/Category";

const Home = () => {
  const dispatch = useAppDispatch();
  const productCards = useSelector(getProducts);
  const categories = useSelector(getCategories);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={style.homePage}>
      <aside className={style.categoriesBar}>
          <ul>
            {categories.map((c) => (
              <li key={c.code}>
                <Category category={c} />
              </li>
            ))}
          </ul>
      </aside>
      <div className={style.homeContent}>
        <div className={style.productCards}>
          {productCards.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
