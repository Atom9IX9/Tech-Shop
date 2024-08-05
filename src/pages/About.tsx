import { useTranslation } from "react-i18next";
import { FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiExpress,
  SiI18Next,
  SiJest,
  SiRedux,
  SiSequelize,
  SiTypescript,
} from "react-icons/si";
import { DiMysql } from "react-icons/di";
import style from "style/aboutPage/about.module.css";

const About = () => {
  const { t } = useTranslation(["common", "about"]);

  return (
    <div className={style.pageContainer}>
      <h3>{t("about")}</h3>
      <section className={style.infoSection}>
        <h4>{t("about:goatTitle")}</h4>
        <p className={style.infoSectionText}>{t("about:goatText")}</p>
      </section>
      <section className={style.infoSection}>
        <h4>{t("about:technologiesTitle")}</h4>
        <div className={style.technologies}>
          <Technology
            href="https://legacy.reactjs.org/"
            icon={<FaReact size={50} color="#44c8f5" />}
            title="React.js"
            color="#50a0e4"
          />
          <Technology
            href="https://redux.js.org/"
            icon={<SiRedux size={50} color="#764abc" />}
            title="Redux"
            color="#764abc"
          />
          <Technology
            href="https://jestjs.io/"
            icon={<SiJest size={50} color="#ff7369" />}
            title="Jest"
            color="#ff7369"
          />
          <Technology
            href="https://www.i18next.com/"
            icon={<SiI18Next size={50} color="#53bda5" />}
            title="i18next"
            color="#53ada5"
          />
          <Technology
            href="https://www.typescriptlang.org/"
            icon={<SiTypescript color="#358ef1" size={50} />}
            title="Typescript"
            color="#358ef1"
          />
          <Technology
            href="https://nodejs.org/en"
            icon={<FaNodeJs size={50} color="#68a063" />}
            title="Node.js"
            color="#68a063"
          />
          <Technology
            href="https://expressjs.com/"
            icon={<SiExpress size={50} color="#303030" />}
            title="Express"
            color="#303030"
          />
          <Technology
            href="https://sequelize.org/"
            icon={<SiSequelize size={50} color="#99a8c5" />}
            title="Sequelize"
            color="#242a2d"
          />
          <Technology
            href="https://www.mysql.com/"
            icon={<DiMysql size={50} color="#f29111" />}
            title="MySQL"
            color="#00758f"
          />
        </div>
      </section>
    </div>
  );
};

const Technology: React.FC<TTechnologyProps> = ({
  icon,
  title,
  color,
  href,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={style.technology}
    style={{ borderColor: color }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#ffffff";
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = color + "40";
    }}
  >
    <div className={style.technologyIcon}>{icon}</div>
    <span className={style.technologyTitle} style={{ color }}>
      {title}
    </span>
  </a>
);

export default About;
type TTechnologyProps = {
  icon: JSX.Element;
  title: string;
  color: string;
  href: string;
};
