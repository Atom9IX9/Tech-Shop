import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { CgAdd } from "react-icons/cg";
import categoriesAPI, {
  TMainCategory,
  TSubcategory,
  TSubcategoryCreateData,
} from "api/categoriesAPI";
import style from "style/productStyle/productPage.module.css";
import { getCategoryTranslate } from "utils/getCategoryTranslateWithCode";
import { useTranslation } from "react-i18next";
import { TLng } from "types/types";
import { useContext, useState } from "react";
import { useAppDispatch } from "reducers/store";
import {
  createProductSubcategory,
  fetchSubcategories,
} from "reducers/productsReducer";
import { User } from "components/contexts/UserContext";
import Dialog from "components/Dialog/Dialog";
import SubcategoryForm from "components/Admin/forms/SubcategoryForm";
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
  const addSubcategory = () => {
    setDialog(true);
    dispatch(fetchSubcategories(category));
  };
  const { setValue, handleSubmit, getValues } = useForm<{
    subcategoryCode: string;
  }>();

  const successHandler = (data: TSubcategoryCreateData) => {
    dispatch(
      createProductSubcategory({
        productId,
        subcategory: { ...data, code: getEnCode(data.en) },
      })
    );
  };
  const onSubmit = ({ subcategoryCode }: { subcategoryCode: string }) => {
    dispatch(
      createProductSubcategory({
        productId,
        subcategory: subcategoriesForAdding.filter(sc => sc.code === subcategoryCode)[0]
      })
    )
  };

  return (
    <nav className={style.productPageNav}>
      {dialog && (
        <Dialog close={() => setDialog(false)}>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <APSelect
                name="subcategoryCode"
                options={subcategoriesForAdding?.map((sc) => ({
                  label: sc[i18n.language as TLng],
                  value: sc.code,
                }))}
                setValue={setValue}
              />
              <button>Add</button>
            </form>
            <SubcategoryForm
              categories={categories}
              disableSelect={true}
              defaultSelectValue={category}
              defaultSelectInpValue={getCategoryTranslate(categories, category)}
              //todo: creating productSubcategory on success creating
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
