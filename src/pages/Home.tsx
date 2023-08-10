import { fetchProducts } from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import { getProducts } from "utils/selectors/productSelectors";
import ProductCard from "components/Home/ProductCard";
import style from "style/homeStyle/page.module.css";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HomeCategories from "components/Home/HomeCategories";
import { User } from "components/contexts/UserContext";
import productsAPI from "api/productsAPI";
import categoriesAPI from "api/categoriesAPI";

const Home = () => {
  const dispatch = useAppDispatch();
  const productCards = useSelector(getProducts);
  const { role } = useContext(User);

  const [productImg, setImg] = useState<File | null>(null);

  const createCategory = () => {
    categoriesAPI.createMainCategory({
      en: "Sports and hobbies",
      ua: "Спорт та захоплення",
      ru: "Спорт и увлечения",
    });
  };

  useEffect(() => {
    dispatch(fetchProducts({ category: "all", page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (productImg) {
      productsAPI.createProduct({
        img: productImg,
        price: "2000",
        title: "Some text 4 alalalalala",
        category: "beauty_and_health",
      });
    }
  }, [productImg]);

  if (role === "ADMIN") {
    return (
      <div>
        <input
          type="file"
          onChange={(e) => setImg(e.target.files ? e.target.files[0] : null)}
        />
        <button onClick={createCategory}>Send category</button>
      </div>
    );
  }

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
