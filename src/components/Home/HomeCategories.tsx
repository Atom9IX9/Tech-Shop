import CategoryLink from "./CategoryLink";

import RedLink from "components/UI/RedLink";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "style/homeStyle/sidebar.module.css";
import { getCategories } from "utils/selectors/productSelectors";
import { BsQuestionCircle } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const HomeCategories = () => {
  const { t } = useTranslation(["sidebar"]);

  const categories = useSelector(getCategories);

  return (
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
        <NavLink to="/" className={style.categoriesNavElement}>
          <RedLink icon={<BsQuestionCircle size={25} color="#00000050" />}>
            {t("helpCenter")}
          </RedLink>
        </NavLink>
        <NavLink to="/" className={style.categoriesNavElement}>
          <RedLink icon={<FaTelegramPlane size={25} color="#00000050" />}>
            {t("telegram")}
          </RedLink>
        </NavLink>
      </nav>
    </aside>
  );
};

export default HomeCategories;
