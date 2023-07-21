import { TMainCategoryCode } from "../../api/categoriesAPI";

import { GiWashingMachine } from "react-icons/gi";
import { BsPhone, BsLaptop } from "react-icons/bs";
import { TbPerfume } from "react-icons/tb";
import { MdSportsTennis } from "react-icons/md";
import { LuGamepad2 } from "react-icons/lu";

const CategoryIcon: React.FC<TProps> = ({ code, ...props }) => {
  switch (code) {
    case "sports_and_hobbies":
      return <MdSportsTennis {...props} />;
    case "household_appliances":
      return <GiWashingMachine {...props} />;
    case "smartphones_tv_and_electronics":
      return <BsPhone {...props} />;
    case "beauty_and_health":
      return <TbPerfume {...props} />;
    case "laptops_and_computers":
      return <BsLaptop {...props} />;
    case "goods_for_gamers":
      return <LuGamepad2 {...props} />;
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
