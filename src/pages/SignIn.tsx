import { useTranslation } from "react-i18next";
import SignInForm from "../components/Forms/SignInForm";
import style from "../style/loginStyle/login.module.css"

const SignIn = () => {
  const { t } = useTranslation("common")

  return (
    <div className={style.formWrap}>
      <div className={style.form}>
        <header>
          <h2 className={style.pageTitle}>{t("signIn")}</h2>
          <hr />
        </header>
        <main className={style.formMain}>
          <SignInForm />
        </main>
      </div>
    </div>
  );
};

export default SignIn;
