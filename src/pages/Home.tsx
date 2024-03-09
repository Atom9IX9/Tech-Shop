import { fetchLikedProductIds, fetchProducts } from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import { getProducts } from "utils/selectors/productSelectors";
import ProductCard from "components/Products/ProductCard";
import style from "style/homeStyle/page.module.css";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import HomeCategories from "components/Home/HomeCategories";
import { User } from "components/contexts/UserContext";
import ProductList from "components/Products/ProductList";

const Home = () => {
  const dispatch = useAppDispatch();
  const productCards = useSelector(getProducts);
  const { id } = useContext(User);

  useEffect(() => {
    dispatch(fetchProducts({ category: "all", page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLikedProductIds());
  }, [id, dispatch]);

  return (
    <div className={style.homePage}>
      <HomeCategories />
      <main className={style.homeContent}>
        <div className={style.productCards}>
          <ProductList products={productCards} />
        </div>
      </main>
    </div>
  );
};

export default Home;
