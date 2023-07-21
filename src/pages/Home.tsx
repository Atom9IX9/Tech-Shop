import { fetchProducts } from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import { getProducts } from "utils/selectors/productSelectors";
import ProductCard from "components/Home/ProductCard";
import style from "style/homeStyle/page.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import HomeCategories from "components/Home/HomeCategories";

const Home = () => {
  const dispatch = useAppDispatch();
  const productCards = useSelector(getProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={style.homePage}>
      <HomeCategories />
      <main className={style.homeContent}>
        <div className={style.productCards}>
          {productCards.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
