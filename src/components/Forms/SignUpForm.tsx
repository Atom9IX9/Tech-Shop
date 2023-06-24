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
import { useNavigate } from "react-router-dom";
import SubmitBtn from "../UI/SubmitBtn"

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<TFormValues>();

  const signUp: SubmitHandler<TFormValues> = ({
    email,
    passwordReg,
    name,
    surname,
    number,
  }) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, passwordReg)
      .then(({ user }) => {
        updateProfile(user, { displayName: `${name} ${surname}` }).then(() => {
          dispatch(
            setUser({
              displayName: `${name} ${surname}`,
              email,
              isAuth: true,
              phoneNumber: number,
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
    <form onSubmit={handleSubmit(signUp)}>
      <Input<TFormValues>
        errors={errors}
        touched={touchedFields.name}
        name="name"
        register={register}
        required
        isDirty={dirtyFields.name}
      />
      <Input<TFormValues>
        errors={errors}
        touched={touchedFields.surname}
        name="surname"
        register={register}
        required
        isDirty={dirtyFields.surname}
      />
      <Input<TFormValues>
        errors={errors}
        touched={touchedFields.number}
        name="number"
        register={register}
        required
        type="number"
        isDirty={dirtyFields.number}

      />
      <Input<TFormValues>
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
      <Input<TFormValues>
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
type TFormValues = {
  email: string;
  passwordReg: string;
  name: string;
  surname: string;
  number: string;
};
