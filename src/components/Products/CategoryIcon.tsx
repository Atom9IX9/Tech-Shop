import { TMainCategoryCode } from "../../api/categoriesAPI";
import { GiWashingMachine } from "react-icons/gi";
import { BsPhone, BsBrush } from "react-icons/bs";
import { MdSportsTennis } from "react-icons/md"

const CategoryIcon: React.FC<TProps> = ({ code, ...props }) => {
  switch (code) {
    case "sport":
      return <MdSportsTennis {...props} />;
    case "household_appliances":
      return <GiWashingMachine {...props} />;
    case "phones":
      return <BsPhone {...props} />;
    case "cosmetic":
      return <BsBrush {...props} />;
    default:
      return <></>;
  }
};

export default CategoryIcon;
type TProps = {
  code: TMainCategoryCode;
  size?: number;
  color?: string;
};
