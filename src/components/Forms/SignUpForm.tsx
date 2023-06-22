import Input from "../UI/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { isValidEmail } from "../../utils/validation/login";

const SignUpForm = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<TFormValues>();

  const signUp: SubmitHandler<TFormValues> = ({ email, password }) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err.message)
        setError("email", { message: "email is invalid" })
      });
  };

  return (
    <form onSubmit={handleSubmit(signUp)}>
      <Input
        name="email"
        register={register}
        type="text"
        required
        validate={{
          isValidEmail
        }}
        errors={errors}
      />
      <Input name="password" register={register} type="password" required />
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUpForm;
type TFormValues = {
  email: string;
  password: string;
};
