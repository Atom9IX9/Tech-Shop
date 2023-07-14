import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentCategory } from "../../reducers/productsReducer";

const Category: React.FC<TProps> = ({ category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectCategory = () => {
    dispatch(setCurrentCategory(category.code))
    navigate(`/${category.code}`);
  };

  return <div onClick={selectCategory}>{category.name}</div>;
};

export default Category;
type TProps = {
  category: any;
};
