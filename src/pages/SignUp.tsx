import { useTranslation } from "react-i18next";
import style from "../style/loginStyle/login.module.css"
import SignUpForm from "../components/Forms/SignUpForm";

const SignUp = () => {
  const { t } = useTranslation("common");

  return (
    <div className={style.formWrapper}>
      <header>
        <h2 className={style.pageTitle}>{t("signUp")}</h2>
        <hr />
      </header>
      <main className={style.formMain}>
        <SignUpForm />
      </main>
    </div>
  );
};

export default SignUp;
