import Input from "../UI/Input";
import { setUser } from "../../reducers/userReducer";
import SubmitBtn from "../UI/SubmitBtn";
import { isValidEmail } from "../../utils/validation/login";
import style from "../../style/loginStyle/login.module.css";
import TextButton from "../UI/TextButton";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["common", "auth"]);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<TSignInValues>();

  const submit: SubmitHandler<TSignInValues> = (formData) => {
    dispatch(
      setUser({
        name: "name", // user api
        surname: "surname", // user api
        role: "USER", // user api
        email: "email", // user api
        id: 1, // user api
      })
    );
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input<TSignInValues>
        name="email"
        register={register}
        required
        errors={errors}
        touched={touchedFields.email}
        isDirty={dirtyFields.email}
        validate={{ isValidEmail }}
      />
      <Input<TSignInValues>
        name="password"
        register={register}
        required
        errors={errors}
        type="password"
        touched={touchedFields.password}
        isDirty={dirtyFields.password}
      />
      <div className={style.rootErr}>
        {t(`auth:${errors.root?.message || ""}`)}
      </div>
      <Input<TSignInValues>
        name="rememberMe"
        register={register}
        errors={errors}
        type="checkbox"
      />
      <SubmitBtn>{t("common:signIn") as string}</SubmitBtn>
      <div className={style.signUpLink}>
        <TextButton to="/sign-up">{t("common:signUp") as string}</TextButton>
      </div>
    </form>
  );
};

export default SignInForm;
type TSignInValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};
