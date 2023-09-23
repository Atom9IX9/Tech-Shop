import { useState } from "react";
import { IoPeopleSharp } from "react-icons/io5";
import { MdDashboard, MdCategory, MdReportProblem } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import classNames from "classnames";
import style from "style/admin/adminStyle.module.css";
import { NavLink } from "react-router-dom";

const AdminPanelNav = () => {
  return (
    <nav className={classNames(style.adminNav, style.APElement)}>
      <NavButton
        icon={<MdDashboard size={18} color="gray" />}
        activeIcon={<MdDashboard size={18} color={"#2F80ED"} />}
      >
        Dashboard
      </NavButton>
      <NavButton
        icon={<IoPeopleSharp size={18} color="gray" />}
        activeIcon={<IoPeopleSharp size={18} color="#2F80ED" />}
      >
        People
      </NavButton>
      <NavButton
        icon={<RiAdminFill size={18} color="gray" />}
        activeIcon={<RiAdminFill size={18} color="#2F80ED" />}
      >
        Admins
      </NavButton>
      <NavButton
        icon={<FaShoppingBag size={18} color="gray" />}
        activeIcon={<FaShoppingBag size={18} color="#2F80ED" />}
      >
        Products
      </NavButton>
      <NavButton
        icon={<MdCategory size={18} color="gray" />}
        activeIcon={<MdCategory size={18} color="#2F80ED" />}
      >
        Categories
      </NavButton>
      <NavButton
        icon={<MdReportProblem size={18} color="gray" />}
        activeIcon={<MdReportProblem size={18} color="#2F80ED" />}
      >
        Reports
      </NavButton>
    </nav>
  );
};

const NavButton: React.FC<TNavButtonProps> = ({
  children,
  icon,
  activeIcon,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <NavLink
      to={children.toLowerCase()}
      className={({ isActive }) => {
        setIsActive(isActive);
        return [isActive ? style.active : "", style.navButton].join(" ");
      }}
    >
      {isActive ? activeIcon : icon}
      {children}
    </NavLink>
  );
};

export default AdminPanelNav;
type TNavButtonProps = {
  children: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
};
