import Input from "../UI/Input";
import { signInUser } from "../../reducers/userReducer";
import SubmitBtn from "../UI/SubmitBtn";
import { isValidEmail } from "../../utils/validation/login";
import style from "../../style/loginStyle/login.module.css";
import TextButton from "../UI/TextButton";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { TSignInData } from "api/userAPI";
import { useAppDispatch } from "reducers/store";
import { useEffect, useContext } from "react"
import { useSelector } from "react-redux";
import { getUserError } from "utils/selectors/userSelectors";
import { User } from "components/contexts/UserContext";

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["common", "auth"]);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<TSignInData>();
  const error = useSelector(getUserError)
  const { role } = useContext(User)

  const submit: SubmitHandler<TSignInData> = (formData) => {
    dispatch(signInUser(formData));
  };

  useEffect(() => {
    if (!error && role !== "GUEST") {
      navigate(-2);
    } else if (error?.message !== "pending" && error && error.message) {
      setError("root", { message: "err/" + error.message });
    }
  }, [error, role, navigate, setError])

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input<TSignInData>
        name="email"
        register={register}
        required
        errors={errors}
        touched={touchedFields.email}
        isDirty={dirtyFields.email}
        validate={{ isValidEmail }}
        autoComplete="on"
      />
      <Input<TSignInData>
        name="password"
        register={register}
        required
        errors={errors}
        type="password"
        touched={touchedFields.password}
        isDirty={dirtyFields.password}
        autoComplete="on"
      />
      <div className={style.rootErr}>
        {t(`auth:${errors.root?.message || ""}`)}
      </div>
      <Input<TSignInData>
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

