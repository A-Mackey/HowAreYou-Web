import HomeLoggedIn from "../components/homeLoggedIn";
import HomeLoggedOut from "../components/homeLoggedOut";
import { UserAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = UserAuth();

  return (
    <div className="home-wrapper">
      <div className="home-body">
        {user !== null ? <HomeLoggedIn /> : <HomeLoggedOut />}
      </div>
    </div>
  );
}
