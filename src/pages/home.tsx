import HomeLoggedIn from "../components/homeLoggedIn";
import { UserAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = UserAuth();
  return (
    <div className="home-wrapper">
      <div className="home-body">
        {user !== null ? <HomeLoggedIn /> : <h1>Welcome to the home page</h1>}
      </div>
    </div>
  );
}
