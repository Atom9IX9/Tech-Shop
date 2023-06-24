import { useTranslation } from "react-i18next";
import style from "../style/loginStyle/login.module.css"
import SignUpForm from "../components/Forms/SignUpForm";

const SignUp = () => {
  const { t } = useTranslation("common");

  return (
    <div className={style.formWrap}>
      <div className={style.form}>
        <header>
          <h2 className={style.pageTitle}>{t("signUp")}</h2>
          <hr />
        </header>
        <main className={style.formMain}>
          <SignUpForm />
        </main>
      </div>
    </div>
  );
};

export default SignUp;
