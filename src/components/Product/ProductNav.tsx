import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { TMainCategory, TSubcategory } from "api/categoriesAPI";
import style from "style/productStyle/productPage.module.css";
import { getCategoryTranslate } from "utils/getCategoryTranslateWithCode";
import { useTranslation } from "react-i18next";
import { TLng } from "types/types";


const ProductPageNav: React.FC<TProductPageNav> = ({
  category,
  subcategories,
  categories
}) => {
  const { i18n } = useTranslation()

  return (
    <nav className={style.productPageNav}>
      <NavLink to={`/${category}`} className={style.navLink}>
        {getCategoryTranslate(categories, category).toUpperCase()}
      </NavLink>
      {subcategories.map((sc) => {
        return (
          <div className={style.subcategoriesNavLinkContainer}>
            <IoIosArrowForward size={13} />
            <NavLink
              className={style.subcategoriesNavLink}
              to={`/${category}/${sc.code}`}
            >
              {sc[i18n.language as TLng].toLocaleUpperCase()}
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
};

export default ProductPageNav
type TProductPageNav = { category: string; subcategories: TSubcategory[]; categories: TMainCategory[] };
