import { useState } from "react";
import { APIProvider } from "../context/APIContext";
import { UserAuth } from "../context/AuthContext";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Loading from "./sub-components/loading";
import NotificationBar from "./sub-components/notificationBar";
import { SignInButton } from "./sub-components/signInButton";

export function HomeLoggedOut() {
  const { windowWidth } = useWindowDimensions();
  const {
    googleSignIn,
    createAccountWithUserAndPassword,
    signInWithUserAndPassword,
  } = UserAuth();
  const { upsertUserData } = APIProvider();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [signingUp, setSigningUp] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const createAccountWithEmail = async () => {
    setLoading(true);

    if (password !== confirmedPassword) {
      setErrorMessage("Passwords do not match");
      setError(true);
      setLoading(false);
      return;
    }

    const createAccountResponse = await createAccountWithUserAndPassword(
      email,
      password
    );

    const newUserData = {
      email: email,
      email_newsletter: true,
    };

    const createDBResponse = await upsertUserData(newUserData, email);

    setLoading(false);
  };

  const signInWithEmail = async () => {
    setLoading(true);

    const response = await signInWithUserAndPassword(email, password);
    console.log(response);

    setLoading(false);
  };

  const signInMethods = [
    {
      id: 0,
      name: "Sign in with Google",
      image: "./google.svg",
      color: "var(--blueLight)",
      exe: () => {
        googleSignIn();
      },
    },
    {
      id: 1,
      name: "Sign up with Email",
      image: "./email.svg",
      color: "var(--primaryLight)",
      exe: () => {
        setSigningUp(true);
      },
    },
  ];

  const signUpWithEmailForm = (
    <div className="home-logged-out-left">
      <div className="home-logged-out-signing-up-title">
        <h1>{"We're glad you're here 🥰"}</h1>
      </div>

      <div className="home-logged-out-sign-in-form">
        <div>
          <h3>Email</h3>
          <input
            type="text"
            className="profile-input"
            value={email}
            onChange={(n) => setEmail(n.target.value)}
          />
        </div>

        <div>
          <h3>Password</h3>
          <input
            type="text"
            className="profile-input"
            value={password}
            onChange={(n) => setPassword(n.target.value)}
          />
        </div>

        <div>
          <h3>Confirm Password</h3>
          <input
            type="text"
            className="profile-input"
            value={confirmedPassword}
            onChange={(n) => setConfirmedPassword(n.target.value)}
          />
        </div>

        <button
          className="home-logged-out-sign-up-button"
          onClick={() => {
            createAccountWithEmail();
          }}>
          <h3>Sign Up</h3>
        </button>

        {loading && <Loading />}
        {error && <NotificationBar text={errorMessage} type={"failure"} />}
      </div>
    </div>
  );

  const signInWithEmailForm = (
    <div className="home-logged-out-left">
      <div className="home-logged-out-title">
        <h1>{"Oh no! Looks like you aren't logged in 🥺"}</h1>
      </div>

      <div className="home-logged-out-sign-in-form">
        <div>
          <h3>Email</h3>
          <input
            type="text"
            className="profile-input"
            value={email}
            onChange={(n) => setEmail(n.target.value)}
          />
        </div>

        <div>
          <h3>Password</h3>
          <input
            type="password"
            className="profile-input"
            value={password}
            onChange={(n) => setPassword(n.target.value)}
          />
        </div>
        <button
          className="home-logged-out-sign-up-button"
          onClick={() => {
            signInWithEmail();
          }}>
          <h3>Sign In</h3>
        </button>
      </div>

      <div className="home-logged-out-signin">
        {signInMethods.map((method) => (
          <SignInButton
            key={method.id}
            id={method.id}
            image={method.image}
            alt={method.name}
            color={method.color}
            text={method.name}
            onClick={method.exe}
          />
        ))}
      </div>

      {loading && <Loading />}
      {error && <NotificationBar text={errorMessage} type={"failure"} />}
    </div>
  );

  return (
    <div className="home-logged-out-container">
      <div className="home-logged-out-body">
        {signingUp ? signUpWithEmailForm : signInWithEmailForm}
        {windowWidth > 1070 && (
          <img src="./bg.svg" alt="logo" className="home-logged-out-right" />
        )}
      </div>
    </div>
  );
}

export default HomeLoggedOut;
