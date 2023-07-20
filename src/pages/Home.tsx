import { fetchProducts } from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import {
  getCategories,
  getProducts,
} from "utils/selectors/productSelectors";
import ProductCard from "components/Products/ProductCard";
import style from "style/homeStyle/page.module.css";
import CategoryLink from "components/Products/CategoryLink";
import RedLink from "components/UI/RedLink";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BsQuestionCircle } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// todo (refactor) --> <aside> to "components/HomeSidebar.tsx"

const Home = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["sidebar"]);
  const navigate = useNavigate();
  const productCards = useSelector(getProducts);
  const categories = useSelector(getCategories);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={style.homePage}>
      <aside className={style.categoriesBar}>
        <ul className={style.categoriesList}>
          {categories.map((c) => (
            <li key={c} className={style.categoryWrapper}>
              <div className={style.category}>
                <CategoryLink category={c} />
              </div>
            </li>
          ))}
        </ul>
        <nav className={style.categoriesNav}>
          <div
            className={style.categoriesNavElement}
            onClick={() => navigate("/")}
          >
            <RedLink icon={<BsQuestionCircle size={25} color="#00000050" />}>
              {t("helpCenter")}
            </RedLink>
          </div>
          <div
            className={style.categoriesNavElement}
            onClick={() => navigate("/")}
          >
            <RedLink icon={<FaTelegramPlane size={25} color="#00000050" />}>
              {t("telegram")}
            </RedLink>
          </div>
        </nav>
      </aside>
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
