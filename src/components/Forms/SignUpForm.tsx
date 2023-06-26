import Input from "../UI/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { isValidEmail } from "../../utils/validation/login";
import { useTranslation } from "react-i18next";
import { setUser } from "../../reducers/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SubmitBtn from "../UI/SubmitBtn";
import { TSignUpValues, signUp } from "../../firebase";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<TSignUpValues>();

  const submit: SubmitHandler<TSignUpValues> = (formData) => {
    signUp(formData)
      .then((user) => {
        updateProfile(user, {
          displayName: `${formData.name} ${formData.surname}`,
        }).then(() => {
          dispatch(
            setUser({
              displayName: `${formData.name} ${formData.surname}`,
              email: formData.email,
              isAuth: true,
              phoneNumber: formData.number,
              uid: user.uid,
            })
          );
          navigate("/");
        });
      })
      .catch((err) => {
        setError("email", { message: err.code });
      });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input<TSignUpValues>
        errors={errors}
        touched={touchedFields.name}
        name="name"
        register={register}
        required
        isDirty={dirtyFields.name}
      />
      <Input<TSignUpValues>
        errors={errors}
        touched={touchedFields.surname}
        name="surname"
        register={register}
        required
        isDirty={dirtyFields.surname}
      />
      <Input<TSignUpValues>
        errors={errors}
        touched={touchedFields.number}
        name="number"
        register={register}
        required
        type="number"
        isDirty={dirtyFields.number}
      />
      <Input<TSignUpValues>
        touched={touchedFields.email}
        name="email"
        register={register}
        type="text"
        required
        validate={{
          isValidEmail,
        }}
        errors={errors}
        isDirty={dirtyFields.email}
      />
      <Input<TSignUpValues>
        errors={errors}
        name="passwordReg"
        register={register}
        type="password"
        required
      />
      <SubmitBtn>{t("signUp") as string}</SubmitBtn>
    </form>
  );
};

export default SignUpForm;