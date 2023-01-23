import { useEffect, useState } from "react";
import Goals from "../components/sub-components/goals";
import Loading from "../components/sub-components/loading";
import { APIProvider } from "../context/APIContext";
import { UserAuth } from "../context/AuthContext";

function Profile(_props: any) {
  const { getUserGoals } = APIProvider();
  const { user } = UserAuth();

  const [goals, setGoals] = useState<string[]>([]);

  useEffect(() => {
    hydrateGoals();
  }, [user]);

  const hydrateGoals = async () => {
    setGoals(await getUserGoals());
  };

  return (
    <div className="profile-container">
      <div className="profile-body">
        <div className="profile-header">
          <h1>Profile</h1>
          <button className="profile-header-logout-button">Log Out</button>
        </div>

        <div className="profile-content">
          <div className="profile-content-inputs">
            <div className="profile-input-with-header">
              <h3>First Name</h3>
              <input
                type="text"
                className="profile-input"
                onChange={(n) => console.log(n.target.value)}
              />
            </div>

            <div className="profile-input-with-header">
              <h3>Last Name</h3>
              <input
                type="text"
                className="profile-input"
                onChange={(n) => console.log(n.target.value)}
              />
            </div>
          </div>

          <img
            src={user?.photoURL}
            alt="User Img"
            className="profile-picture"
          />
        </div>

        <div className="profile-goals-section">
          <div className="profile-goals">
            <h2>Goals</h2>

            <div className="profile-goals-container">
              {user === null ? (
                <Loading />
              ) : (
                <Goals goals={goals} editable={true} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
