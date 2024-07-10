import { fetchMoreProducts, fetchProducts } from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import { getFetchings, getIsAllLoaded, getProducts } from "utils/selectors/productSelectors";
import style from "style/homeStyle/page.module.css";
import { RefObject, useEffect } from "react";
import { useSelector } from "react-redux";
import HomeCategories from "components/Home/HomeCategories";
import ProductList from "components/Products/ProductList";
import Loader from "components/Loader/Loader";
import { useIntersection } from "hooks/useIntersection";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TLng } from "types/types";

const Home = () => {
  const dispatch = useAppDispatch();
  const productCards = useSelector(getProducts);
  const fetchings = useSelector(getFetchings);
  const isAllLoaded = useSelector(getIsAllLoaded);

  const [intersectionRef, isIntersection] = useIntersection();
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation()

  useEffect(() => {
    if (isIntersection && !isAllLoaded) {
      dispatch(fetchMoreProducts({ category: "all" }));
    }
  }, [isIntersection, dispatch, isAllLoaded]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        category: "all",
        page: 1,
        like: searchParams.get("query") || "",
        likeLng: i18n.language as TLng
      })
    );
  }, [dispatch, searchParams, i18n.language]);

  return (
    <div className={style.homePage}>
      <HomeCategories />
      <main className={style.homeContent}>
        <section className={style.productCards}>
          <ProductList products={productCards} />
          <div className={style.intersectionLoader}>
            {fetchings.productsFetchingMore && <Loader />}
          </div>
          <div ref={intersectionRef as RefObject<HTMLDivElement>}></div>
        </section>
      </main>
    </div>
  );
};

export default Home;
