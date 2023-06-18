import { useTranslation } from "react-i18next";
import SbBtn from "./SidebarBtn";
// ? icons
import { TbCategory2 } from "react-icons/tb";
import { BsQuestionCircle } from "react-icons/bs"
import { FaTelegramPlane } from "react-icons/fa"
import { BsCart4 } from "react-icons/bs";

import style from "../../style/sidebarStyle/sidebarStyle.module.css";


const SidebarMainBtns = () => {
  const { t } = useTranslation();

  return (
    <div className={style.btns}>
      <SbBtn
        icon={<TbCategory2 color="var(--dark-bg-color)" size={27} />}
        title={t("sidebar.Product catalogue")}
      />
      <hr />
      <SbBtn 
        icon={<BsQuestionCircle color="var(--dark-bg-color)" size={27} />}
        title={t("sidebar.Help center")}
      />
      <SbBtn 
        icon={<FaTelegramPlane color="var(--dark-bg-color)" size={27} />}
        title={t("sidebar.Telegram")}
      />
      <hr />
      <SbBtn 
        icon={<BsCart4 color="var(--dark-bg-color)" size={27} />}
        title={t("sidebar.Basket")}
      />
    </div>
  );
};

export default SidebarMainBtns;
