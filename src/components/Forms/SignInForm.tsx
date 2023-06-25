import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../UI/Input";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import SubmitBtn from "../UI/SubmitBtn"

const SignInForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<TFormValues>();

  const signIn: SubmitHandler<TFormValues> = ({ email, password, rememberMe }) => {
    const auth = getAuth();
    if (rememberMe) {
      setPersistence(auth, browserLocalPersistence)
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setUser({
          displayName: user.displayName,
          email,
          isAuth: true,
          phoneNumber: user.phoneNumber,
          uid: user.uid
        }))
        navigate("/")
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
        touched={touchedFields.email}
        isDirty={dirtyFields.email}
      />
      <Input<TFormValues>
        name="password"
        register={register}
        required
        errors={errors}
        type="password"
        touched={touchedFields.password}
        isDirty={dirtyFields.password}
      />
      <Input<TFormValues>
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
type TFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};
