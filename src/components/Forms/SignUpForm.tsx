import Input from "../UI/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { isValidEmail } from "../../utils/validation/login";
import { useTranslation } from "react-i18next";
import { setUser } from "../../reducers/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

const SignUpForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TFormValues>();

  const signUp: SubmitHandler<TFormValues> = ({
    email,
    password,
    name,
    surname,
    number,
  }) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName: `${name} ${surname}` }).then(() => {
          dispatch(setUser({
            displayName: `${name} ${surname}`,
            email,
            isAuth: true,
            phoneNumber: number,
            uid: user.uid,
          }));
          navigate("/")
        });
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
      <Input<TFormValues>
        name="email"
        register={register}
        type="text"
        required
        validate={{
          isValidEmail,
        }}
        errors={errors}
      />
      <Input<TFormValues>
        name="password"
        register={register}
        type="password"
        required
      />
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
