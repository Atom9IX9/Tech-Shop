import { useTranslation } from "react-i18next";
import style from "../style/loginStyle/signUp.module.css"
import SignUpForm from "../components/Forms/SignUpForm";

const SignUp = () => {
  const { t } = useTranslation("common");

  return (
    <div className={style.signUp}>
      <header>
        <h2 className={style.pageTitle}>{t("signUp")}</h2>
        <hr />
      </header>
      <main className={style.formWrapper}>
        <SignUpForm />
      </main>
    </div>
  );
};

export default SignUp;
