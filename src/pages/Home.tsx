import { useEffect } from "react";
import { User } from "../components/contexts/UserContext";
import { fetchProducts } from "../reducers/productsReducer";
import { useAppDispatch } from "../reducers/store";
import { useSelector } from "react-redux";
import { getProducts } from "../utils/selectors/pruductSelectors";
import ProductCard from "../components/Products/ProductCard";

const Home = () => {
  const dispatch = useAppDispatch();
  const productCards = useSelector(getProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <div>{ productCards.map((p) => <ProductCard product={p} key={p.id} />) }</div>
    </div>
  );
};

export default Home;
