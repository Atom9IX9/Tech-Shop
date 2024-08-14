import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { CgAdd } from "react-icons/cg";
import {
  TMainCategory,
  TSubcategory,
  TSubcategoryCreateData,
} from "api/categoriesAPI";
import style from "style/productStyle/productPage.module.css";
import { getCategoryTranslate } from "utils/getCategoryTranslateWithCode";
import { useTranslation } from "react-i18next";
import { TLng } from "types/types";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "reducers/store";
import {
  createProductSubcategory,
  fetchSubcategories,
} from "reducers/productsReducer";
import { User } from "components/contexts/UserContext";
import Dialog from "components/Dialog/Dialog";
import SubcategoryForm, {
  SubmitBtn,
} from "components/Admin/forms/SubcategoryForm";
import { APSelect } from "components/Admin/APInput";
import { useForm } from "react-hook-form";
import { getEnCode } from "utils/getCategoryCode";

const ProductPageNav: React.FC<TProductPageNav> = ({
  category,
  subcategories,
  categories,
  subcategoriesForAdding,
  productId,
}) => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { role } = useContext(User);

  const [dialog, setDialog] = useState(false);
  const [currentSubcategoryOrder, setCurrentSubcategoryOrder] = useState(
    subcategories.length ? subcategories[subcategories.length - 1].order + 1 : 1
  );

  useEffect(() => {
    dispatch(
      fetchSubcategories({
        categoryCode: category,
        order: currentSubcategoryOrder,
      })
    );
  }, [subcategories, category, dispatch, currentSubcategoryOrder]);

  const addSubcategory = () => {
    setDialog(true);
  };
  const { setValue, handleSubmit } = useForm<{
    subcategoryCode: string;
  }>();

  const successHandler = (data: TSubcategoryCreateData) => {
    dispatch(
      createProductSubcategory({
        productId,
        subcategory: { ...data, code: getEnCode(data.en) },
        order: currentSubcategoryOrder,
      })
    );
    setCurrentSubcategoryOrder(currentSubcategoryOrder + 1);
  };
  const onSubmit = ({ subcategoryCode }: { subcategoryCode: string }) => {
    dispatch(
      createProductSubcategory({
        productId,
        subcategory: subcategoriesForAdding.filter(
          (sc) => sc.code === subcategoryCode
        )[0],
        order: currentSubcategoryOrder,
      })
    );
    setCurrentSubcategoryOrder(currentSubcategoryOrder + 1);
  };

  return (
    <nav className={style.productPageNav}>
      {dialog && (
        <Dialog close={() => setDialog(false)}>
          <div className={style.dialogWindow}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={style.dialogWindowForm}
            >
              <APSelect
                name="subcategoryCode"
                options={subcategoriesForAdding?.map((sc) => ({
                  label: sc[i18n.language as TLng],
                  value: sc.code,
                }))}
                setValue={setValue}
              />
              <div className={style.addBtnContainer}>
                <SubmitBtn>Add</SubmitBtn>
              </div>
            </form>
            <div className={style.orLine}>АБО</div>
            <SubcategoryForm
              categories={categories}
              disableSelect={true}
              defaultSelectValue={category}
              defaultSelectInpValue={getCategoryTranslate(categories, category)}
              order={currentSubcategoryOrder}
              onSuccess={successHandler}
            />
          </div>
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
  productId: number;
};
