import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCurrentCategory,
} from "../../reducers/productsReducer";
import CategoryIcon from "./CategoryIcon";
import style from "../../style/homeStyle/productCard/categoryLink.module.css";
import RedLink from "../UI/RedLink";
import { TMainCategoryCode } from "../../api/categoriesAPI";
import { useTranslation } from "react-i18next";

const Category: React.FC<TProps> = ({ category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation("categories")

  const selectCategory = () => {
    dispatch(setCurrentCategory(category));
    navigate(`/${category}`);
  };

  return (
    <div onClick={selectCategory} className={style.category}>
      <RedLink
        icon={
          <div className={style.iconWrapper}>
            <CategoryIcon code={category} size={25} color="#aeaeae" />
          </div>
        }
        textStyle="underline"
      >
        {t(category)}
      </RedLink>
    </div>
  );
};

export default Category;
type TProps = {
  category: TMainCategoryCode;
};
