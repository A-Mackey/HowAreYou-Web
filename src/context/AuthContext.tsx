import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import { APIProvider } from "./APIContext";

type UserAuthentication = {
  googleSignIn: any;
  googleSignInWithRedirect: any;
  user: any;
  logOut: any;
  createAccountWithUserAndPassword: any;
  signInWithUserAndPassword: any;
};

const AuthContext = createContext<UserAuthentication>({
  googleSignIn: null,
  googleSignInWithRedirect: null,
  user: null,
  logOut: null,
  createAccountWithUserAndPassword: null,
  signInWithUserAndPassword: null,
});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(null);
  const { upsertUserData } = APIProvider();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      var loggedInUser = result.user;
      console.log(loggedInUser);
    });
    // signInWithRedirect(auth, provider);
  };

  const googleSignInWithRedirect = (successFunc: any, errorFunc: any) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        var loggedInUser = result.user;
        console.log(loggedInUser);
        const newUserData = {
          email: loggedInUser.email,
          email_newsletter: true,
        };

        await upsertUserData(newUserData);
        successFunc();
      })
      .catch((error) => {
        errorFunc();
      });
    // signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const createAccountWithUserAndPassword = async (
    email: any,
    password: any
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = await userCredential.user;
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithUserAndPassword = async (
    email: any,
    password: any,
    successFunc: Function,
    errorFunc: Function
  ) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        successFunc();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        errorFunc();
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        googleSignInWithRedirect,
        logOut,
        user,
        createAccountWithUserAndPassword,
        signInWithUserAndPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = (): UserAuthentication => {
  return useContext(AuthContext);
};
