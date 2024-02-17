import { TMainCategory } from "api/categoriesAPI";
import { useTranslation } from "react-i18next";
import style from "style/admin/avCategory.module.css";
import { TLng } from "types/types";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useAppDispatch } from "reducers/store";
import { deleteCategory } from "reducers/productsReducer";

const AvCategory: React.FC<TAvCategoryProps> = ({ category }) => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const deleteThisCategory = () => {
    dispatch(deleteCategory(category.code));
  };

  return (
    <div className={style.avCategory}>
      <div className={style.categoryCode}>{category.code}</div>
      <div className={style.categoryTranslate}>
        {category[i18n.language as TLng]}
      </div>
      <div className={style.deleteButton} onClick={deleteThisCategory}>
        <AiOutlineCloseCircle size={20} color="var(--red-bg-color)" />
      </div>
    </div>
  );
};

export default AvCategory;
type TAvCategoryProps = {
  category: TMainCategory;
};
