import Input from "../UI/Input";
import { signUpUser } from "../../reducers/userReducer";
import SubmitBtn from "../UI/SubmitBtn";
import { isValidEmail, noWhitespace } from "../../utils/validation/login";
import TextButton from "../UI/TextButton";
import style from "../../style/loginStyle/login.module.css";

import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TSignUpData } from "api/userAPI";
import { useAppDispatch } from "reducers/store";
import { getUserError } from "utils/selectors/userSelectors";
import { useSelector } from "react-redux";
import { useEffect, useContext } from "react";
import { User } from "components/contexts/UserContext";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<TSignUpData>();
  const error = useSelector(getUserError);
  const { role } = useContext(User);

  const submit: SubmitHandler<TSignUpData> = (formData) => {
    dispatch(signUpUser(formData));
  };

  useEffect(() => {
    if (!error && role !== "GUEST") {
      navigate(-1);
    } else if (error?.message !== "pending" && error && error.message) {
      setError(error?.info?.field, { message: "err/" + error.message });
    }
  }, [error, role, navigate, setError]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input<TSignUpData>
        errors={errors}
        touched={touchedFields.name}
        name="name"
        register={register}
        required
        isDirty={dirtyFields.name}
        validate={{ noWhitespace }}
      />
      <Input<TSignUpData>
        errors={errors}
        touched={touchedFields.surname}
        name="surname"
        register={register}
        required
        isDirty={dirtyFields.surname}
        validate={{ noWhitespace }}
      />
      <Input<TSignUpData>
        errors={errors}
        touched={touchedFields.phoneNumber}
        name="phoneNumber"
        register={register}
        required
        type="number"
        isDirty={dirtyFields.phoneNumber}
      />
      <Input<TSignUpData>
        touched={touchedFields.email}
        name="email"
        register={register}
        type="text"
        required
        validate={{ isValidEmail }}
        errors={errors}
        isDirty={dirtyFields.email}
      />
      <Input<TSignUpData>
        errors={errors}
        name="password"
        register={register}
        type="password"
        required
      />
      <SubmitBtn>{t("signUp") as string}</SubmitBtn>
      <div className={style.signInLink}>
        <TextButton to="/sign-in">{t("signIn") as string}</TextButton>
      </div>
    </form>
  );
};

export default SignUpForm;
