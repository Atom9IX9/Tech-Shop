import categoriesAPI, { TMainCategory, TSubcategory } from "api/categoriesAPI";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { setDialog } from "reducers/appReducer";
import { useAppDispatch } from "reducers/store";
import { TLng } from "types/types";
import style from "style/dialogs/catalogueDialog.module.css";
import { IoIosArrowDown } from "react-icons/io";
import classNames from "classnames";

const CatalogueCategoryElement: React.FC<{
  category: TMainCategory;
  index: number;
}> = ({ category, index }) => {
  const { i18n } = useTranslation();

  const [subcategories, setSubcategories] = useState<TSubcategory[] | null>(
    null
  );
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    categoriesAPI
      .getSubcategoriesWithCategory(category.code)
      .then((subcategories) => setSubcategories(subcategories));
  }, [category.code]);

  return (
    <section
      className={classNames(style.categorySection, {
        [style.opened]: isOpened,
      })}
      style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#ffe9ef" }}
    >
      <h2 className={style.categoryName}>
        <NavLink
          className={style.categoryLink}
          to={`/${category.code}`}
          onClick={() =>
            dispatch(setDialog({ name: "catalogue", value: false }))
          }
        >
          {category[i18n.language as TLng]}
        </NavLink>
      </h2>
      <ul className={style.subcategoriesList}>
        {subcategories?.map((sc) => (
          <li>
            <NavLink
              onClick={() =>
                dispatch(setDialog({ name: "catalogue", value: false }))
              }
              className={style.subcategoryLink}
              to={`${category.code}/${sc.code}`}
            >
              {sc[i18n.language as TLng]}
            </NavLink>
          </li>
        ))}
      </ul>
      {subcategories && subcategories.length > 2 && (
        <button
          onClick={() => {
            if (!isOpened) {
              setIsOpened(true);
            } else {
              setIsOpened(false);
            }
          }}
          className={style.moreBtn}
        >
          <div className={style.moreBtnArrow}>
            <IoIosArrowDown />
          </div>
        </button>
      )}
    </section>
  );
};

export default CatalogueCategoryElement;
