import SbBtn from "./SidebarBtn";

import { useTranslation } from "react-i18next";
// ? icons
import { TbCategory2 } from "react-icons/tb";
import { BsQuestionCircle } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import style from "style/sidebarStyle/sidebarStyle.module.css";
import { useAppDispatch } from "reducers/store";
import { setDialog } from "reducers/appReducer";

const SidebarMainBtns = () => {
  const { t } = useTranslation("sidebar");
  const dispatch = useAppDispatch();

  return (
    <div className={style.btns}>
      <SbBtn
        icon={<TbCategory2 color="var(--dark-bg-color)" size={27} />}
        title={t("productCatalogue")}
      />
      <hr />
      <SbBtn
        icon={<BsQuestionCircle color="var(--dark-bg-color)" size={27} />}
        title={t("helpCenter")}
      />
      <SbBtn
        icon={<FaTelegramPlane color="var(--dark-bg-color)" size={27} />}
        title={t("telegram")}
      />
      <hr />
      <SbBtn
        icon={<BsCart4 color="var(--dark-bg-color)" size={27} />}
        title={t("basket")}
        onClick={() => dispatch(setDialog({ name: "basket", value: true }))}
      />
    </div>
  );
};

export default SidebarMainBtns;
