import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TMainCategory,
  setCurrentCategory,
} from "../../reducers/productsReducer";
import CategoryIcon from "./CategoryIcon";
import style from "../../style/homeStyle/productCard/categoryLink.module.css";
import RedLink from "../UI/RedLink";

const Category: React.FC<TProps> = ({ category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectCategory = () => {
    dispatch(setCurrentCategory(category.code));
    navigate(`/${category.code}`);
  };

  return (
    <div onClick={selectCategory} className={style.category}>
      <RedLink
        icon={<CategoryIcon code={category.code} size={25} color="#00000050" />}
        textStyle="underline"
      >
        {category.name}
      </RedLink>
    </div>
  );
};

export default Category;
type TProps = {
  category: TMainCategory;
};
