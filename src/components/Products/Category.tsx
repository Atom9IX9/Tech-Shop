import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TMainCategory,
  setCurrentCategory,
} from "../../reducers/productsReducer";
import CategoryIcon from "./CategoryIcon";
import style from "../../style/homeStyle/page.module.css"

const Category: React.FC<TProps> = ({ category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectCategory = () => {
    dispatch(setCurrentCategory(category.code));
    navigate(`/${category.code}`);
  };

  return (
    <div onClick={selectCategory}>
      <CategoryIcon code={category.code} size={25} color="#00000050" />
      {category.name}
    </div>
  );
};

export default Category;
type TProps = {
  category: TMainCategory;
};
