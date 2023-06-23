import Input from "../UI/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { isValidEmail } from "../../utils/validation/login";
import { useTranslation } from "react-i18next";

const SignUpForm = () => {
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TFormValues>();

  const signUp: SubmitHandler<TFormValues> = ({ email, password, name }) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName: name })
      })
      .catch((err) => {
        setError("email", { message: err.code });
      });
  };

  return (
    <form onSubmit={handleSubmit(signUp)}>
      <Input<TFormValues> name="name" register={register} required />
      <Input<TFormValues> name="surname" register={register} required />
      <Input<TFormValues>
        name="number"
        register={register}
        required
        type="number"
      />
      <Input
        name="email"
        register={register}
        type="text"
        required
        validate={{
          isValidEmail,
        }}
        errors={errors}
      />
      <Input name="password" register={register} type="password" required />
      <button type="submit">{t("signUp")}</button>
    </form>
  );
};

export default SignUpForm;
type TFormValues = {
  email: string;
  password: string;
  name: string;
  surname: string;
  number: string;
};
