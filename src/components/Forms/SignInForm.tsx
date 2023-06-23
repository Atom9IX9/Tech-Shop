import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../UI/Input";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userReducer";

const SignInForm = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TFormValues>();

  const signIn: SubmitHandler<TFormValues> = ({ email, password }) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setUser({
          displayName: user.displayName,
          email,
          isAuth: true,
          phoneNumber: user.phoneNumber,
          uid: user.uid
        }))
        console.log(user);
        
      })
      .catch((err) => {
        setError("root", { message: err.code });        
      });
  };

  return (
    <form onSubmit={handleSubmit(signIn)}>
      <Input<TFormValues>
        name="email"
        register={register}
        required
        errors={errors}
      />
      <Input<TFormValues>
        name="password"
        register={register}
        required
        errors={errors}
      />
      <button type="submit">{t("signIn")}</button>
    </form>
  );
};

export default SignInForm;
type TFormValues = {
  email: string;
  password: string;
};
