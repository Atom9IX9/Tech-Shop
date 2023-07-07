import { useEffect } from "react";
import { fetchProducts } from "../reducers/productsReducer";
import { useAppDispatch } from "../reducers/store";
import { useSelector } from "react-redux";
import { getProducts } from "../utils/selectors/productSelectors";
import ProductCard from "../components/Products/ProductCard";
import style from "../style/homeStyle/page.module.css"

const Home = () => {
  const dispatch = useAppDispatch();
  const productCards = useSelector(getProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <div className={style.productCards}>{ productCards.map((p) => <ProductCard product={p} key={p.id} />) }</div>
    </div>
  );
};

export default Home;
