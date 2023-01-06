import { UserAuth } from "../context/AuthContext";

function HomeLoggedIn(_props: any) {
  const { user, logOut } = UserAuth();

  return (
    <div className="home-logged-in-container">
      <div className="home-logged-in-header">
        <h1 className="home-logged-in-title">
          How are you, {user.displayName.split(" ")[0]}?
        </h1>
        <button onClick={() => logOut()} className="home-logged-in-button">
          Log Out
        </button>
      </div>
    </div>
  );
}

export default HomeLoggedIn;
