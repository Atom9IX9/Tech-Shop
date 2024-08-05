import CategoryLink from "./CategoryLink";
import HomeCategoriesAsideProfile from "./HomeCategoriesAsideProfile";

import RedLink from "components/UI/RedLink";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "style/homeStyle/sidebar.module.css";
import { getCategories } from "utils/selectors/productSelectors";
import { BsQuestionCircle } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { useAppDispatch } from "reducers/store";
import { fetchCategories } from "reducers/productsReducer";
import { User } from "components/contexts/UserContext";

const HomeCategories = () => {
  const { t } = useTranslation(["sidebar", "common"]);
  const dispatch = useAppDispatch()
  const { role } = useContext(User)

  const categories = useSelector(getCategories);

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <aside className={style.categoriesBar}>
      <ul className={style.categoriesList}>
        {categories?.map((c) => (
          <li key={c.code} className={style.categoryWrapper}>
            <div className={style.category}>
              <CategoryLink category={c} />
            </div>
          </li>
        ))}
      </ul>
      <nav className={style.categoriesNav}>
        <NavLink to="/about" className={style.categoriesNavElement}>
          <RedLink icon={<BsQuestionCircle size={25} color="#00000050" />}>
            {t("common:about")}
          </RedLink>
        </NavLink>
        <NavLink to="/" className={style.categoriesNavElement}>
          <RedLink icon={<FaTelegramPlane size={25} color="#00000050" />}>
            {t("telegram")}
          </RedLink>
        </NavLink>
      </nav>
      {role !== "GUEST" && <HomeCategoriesAsideProfile />}
    </aside>
  );
};

export default HomeCategories;
