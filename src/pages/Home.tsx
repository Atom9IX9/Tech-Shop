import { fetchMoreProducts, fetchProducts } from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import { getFetchings, getProducts } from "utils/selectors/productSelectors";
import style from "style/homeStyle/page.module.css";
import { RefObject, useEffect } from "react";
import { useSelector } from "react-redux";
import HomeCategories from "components/Home/HomeCategories";
import ProductList from "components/Products/ProductList";
import Loader from "components/Loader/Loader";
import { useIntersection } from "hooks/useIntersection";

const Home = () => {
  const dispatch = useAppDispatch();
  const productCards = useSelector(getProducts);
  const fetchings = useSelector(getFetchings)

  const [intersectionRef, isIntersection] = useIntersection()

  useEffect(() => {
    if (isIntersection) {
      dispatch(fetchMoreProducts({category: "all"}))
    }
  }, [isIntersection, dispatch])

  useEffect(() => {
    dispatch(fetchProducts({ category: "all", page: 1 }));
  }, [dispatch]);

  return (
    <div className={style.homePage}>
      <HomeCategories />
      <main className={style.homeContent}>
        <section className={style.productCards}>
          <ProductList products={productCards} />
          <div className={style.intersectionLoader} >
            { fetchings.productsFetchingMore && <Loader /> }
          </div>
          <div ref={intersectionRef as RefObject<HTMLDivElement>}></div>
        </section>
      </main>
    </div>
  );
};

export default Home;
