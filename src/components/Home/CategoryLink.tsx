import { setCurrentCategory } from "../../reducers/productsReducer";
import style from "../../style/homeStyle/categoryLink.module.css";
import RedLink from "../UI/RedLink";
import { TMainCategory } from "../../api/categoriesAPI";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { TLng } from "types/types";

const Category: React.FC<TProps> = ({ category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const selectCategory = () => {
    dispatch(setCurrentCategory(category));
    navigate(`/${category.code}`);
  };

  return (
    <div onClick={selectCategory} className={style.category}>
      <RedLink
        icon={
          <div className={style.iconWrapper}>
            <img
              className={style.icon}
              src={`${process.env.REACT_APP_SERVER_API_HOST}/public/${category.icon}`}
              alt=""
            />
          </div>
        }
        textStyle="underline"
      >
        {category[i18n.language as TLng] as string}
      </RedLink>
    </div>
  );
};

export default Category;
type TProps = {
  category: TMainCategory;
};
