import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../UI/Input";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import SubmitBtn from "../UI/SubmitBtn";
import { TSignInValues, signIn } from "../../firebase";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<TSignInValues>();

  const submit: SubmitHandler<TSignInValues> = (formData) => {
    signIn(formData)
      .then((user) => {
        dispatch(
          setUser({
            displayName: user.displayName,
            email: user.email,
            isAuth: true,
            phoneNumber: user.phoneNumber,
            uid: user.uid,
          })
        );
        navigate("/");
      })
      .catch((err) => {
        setError("root", { message: err.code });
      });
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
      {errors.root?.message}
      <Input<TSignInValues>
        name="rememberMe"
        register={register}
        errors={errors}
        type="checkbox"
      />
      <SubmitBtn>{t("signIn") as string}</SubmitBtn>
    </form>
  );
};

export default SignInForm;