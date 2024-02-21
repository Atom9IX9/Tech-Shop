import { useState } from "react";
import { IoPeopleSharp } from "react-icons/io5";
import { MdDashboard, MdCategory, MdReportProblem } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import classNames from "classnames";
import style from "style/admin/adminStyle.module.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminPanelNav = () => {
  const { t } = useTranslation("admin");

  return (
    <nav className={classNames(style.adminNav, style.APElement)}>
      <NavButton
      to="information"
        icon={<MdDashboard size={18} color="gray" />}
        activeIcon={<MdDashboard size={18} color={"#2F80ED"} />}
      >
        {t("information")}
      </NavButton>
      <NavButton
      to="people"
        icon={<IoPeopleSharp size={18} color="gray" />}
        activeIcon={<IoPeopleSharp size={18} color="#2F80ED" />}
      >
        {t("people")}
      </NavButton>
      <NavButton
      to="admins"
        icon={<RiAdminFill size={18} color="gray" />}
        activeIcon={<RiAdminFill size={18} color="#2F80ED" />}
      >
        {t("admins")}
      </NavButton>
      <NavButton
      to="products"
        icon={<FaShoppingBag size={18} color="gray" />}
        activeIcon={<FaShoppingBag size={18} color="#2F80ED" />}
      >
        {t("products")}
      </NavButton>
      <NavButton
      to="categories"
        icon={<MdCategory size={18} color="gray" />}
        activeIcon={<MdCategory size={18} color="#2F80ED" />}
      >
        {t("categories")}
      </NavButton>
      <NavButton
        to="reports"
        icon={<MdReportProblem size={18} color="gray" />}
        activeIcon={<MdReportProblem size={18} color="#2F80ED" />}
      >
        {t("reports")}
      </NavButton>
    </nav>
  );
};

const NavButton: React.FC<TNavButtonProps> = ({
  children,
  to,
  icon,
  activeIcon,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        setIsActive(isActive);
        return [isActive ? style.active : "", style.navButton].join(" ");
      }}
    >
      {isActive ? activeIcon : icon}
      <div className={style.navButtonText}>{children}</div>
    </NavLink>
  );
};

export default AdminPanelNav;
type TNavButtonProps = {
  children: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
  to: string;
};
