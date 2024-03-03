import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { TMainCategory, TSubCategory } from "api/categoriesAPI";
import style from "style/productStyle/productPage.module.css";
import { getCategoryTranslate } from "utils/getCategoryTranslateWithCode";


const ProductPageNav: React.FC<TProductPageNav> = ({
  category,
  subcategories,
  categories
}) => {

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
              {sc.code.toLocaleUpperCase()}
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
};

export default ProductPageNav
type TProductPageNav = { category: string; subcategories: TSubCategory[]; categories: TMainCategory[] };
