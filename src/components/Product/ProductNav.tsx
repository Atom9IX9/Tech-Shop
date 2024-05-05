import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { CgAdd } from "react-icons/cg";
import { TMainCategory, TSubcategory } from "api/categoriesAPI";
import style from "style/productStyle/productPage.module.css";
import { getCategoryTranslate } from "utils/getCategoryTranslateWithCode";
import { useTranslation } from "react-i18next";
import { TLng } from "types/types";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "reducers/store";
import { fetchSubcategories } from "reducers/productsReducer";
import { User } from "components/contexts/UserContext";
import Dialog from "components/Dialog/Dialog";
import SubcategoryForm from "components/Admin/forms/SubcategoryForm";

const ProductPageNav: React.FC<TProductPageNav> = ({
  category,
  subcategories,
  categories,
  subcategoriesForAdding,
}) => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { role } = useContext(User);

  const [dialog, setDialog] = useState(false);
  const addSubcategory = () => {
    setDialog(true);
    dispatch(fetchSubcategories(category));
  };

  return (
    <nav className={style.productPageNav}>
      {dialog && (
        <Dialog close={() => setDialog(false)}>
          <SubcategoryForm
            categories={categories}
            disableSelect={true}
            defaultSelectValue={category}
            defaultSelectInpValue={getCategoryTranslate(
              categories,
              category
            )}
            onSuccess={() => setDialog(false)}
          />
        </Dialog>
      )}
      <NavLink to={`/${category}`} className={style.navLink}>
        {getCategoryTranslate(categories, category).toUpperCase()}
      </NavLink>
      <div className={style.subcategoriesContainer}>
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
        {role === "ADMIN" && (
          <div className={style.addSubcategoryButtonContainer}>
            <div className={style.addSubcategoryButtonArrow}>
              <IoIosArrowForward size={13} />
            </div>
            <div
              className={style.addSubcategoryButton}
              onClick={addSubcategory}
            >
              <CgAdd size={30} color="var(--violet-bg-color)" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ProductPageNav;
type TProductPageNav = {
  category: string;
  subcategories: TSubcategory[];
  categories: TMainCategory[];
  subcategoriesForAdding: TSubcategory[];
};
