import useWindowDimensions from "../hooks/useWindowDimensions";
import { SignInButton } from "./sub-components/signInButton";

export function HomeLoggedOut() {
  const { windowWidth } = useWindowDimensions();

  const signInMethods = [
    {
      id: 0,
      name: "Sign up with Google",
      image: "./google.svg",
      color: "var(--blueLight)",
      exe: () => {
        console.log("Google");
      },
    },
    {
      id: 1,
      name: "Sign up with Email",
      image: "./email.svg",
      color: "var(--primaryLight)",
      exe: () => {
        console.log("Email");
      },
    },
  ];

  return (
    <div className="home-logged-out-container">
      <div className="home-logged-out-body">
        <div className="home-logged-out-left">
          <div className="home-logged-out-title">
            <h1>Oh no! Looks like you aren't logged in</h1>
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
        </div>
        {windowWidth > 1070 && (
          <img src="./bg.svg" alt="logo" className="home-logged-out-right" />
        )}
      </div>
    </div>
  );
}

export default HomeLoggedOut;
