import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

//
const app = initializeApp(firebaseConfig);

export const signIn = async ({
  email,
  password,
  rememberMe,
}: TSignInValues) => {
  const auth = getAuth();
  if (rememberMe) {
    setPersistence(auth, browserLocalPersistence);
  } else {
    setPersistence(auth, browserSessionPersistence);
  }
  const data = await signInWithEmailAndPassword(auth, email, password);
  return data.user;
};
export const signUp = async ({
  email,
  passwordReg,
}: TSignUpValues) => {
  const auth = getAuth();

  const data = await createUserWithEmailAndPassword(auth, email, passwordReg)
  return data.user
};

export type TSignInValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type TSignUpValues = {
  email: string;
  passwordReg: string;
  name: string;
  surname: string;
  number: string;
};
