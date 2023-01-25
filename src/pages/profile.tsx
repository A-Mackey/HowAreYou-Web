import { Switch } from "@mui/material";
import { useEffect, useState } from "react";
import Goals from "../components/sub-components/goals";
import Loading from "../components/sub-components/loading";
import { APIProvider } from "../context/APIContext";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile(_props: any) {
  const { getUserGoals, getBasicUserData, upsertUserData } = APIProvider();
  const { user } = UserAuth();
  const navigate = useNavigate();

  const [goals, setGoals] = useState<string[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newsletter, setNewsletter] = useState<boolean>(true);

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    hydrateGoals();
    hydrateUser();
  }, [user]);

  const hydrateGoals = async () => {
    setGoals(await getUserGoals());
  };

  const hydrateUser = async () => {
    const userData = await getBasicUserData();

    setFirstName(userData.firstName ? userData.firstName : "");
    setLastName(userData.lastName ? userData.lastName : "");
    setEmail(userData.email ? userData.email : "");
    setNewsletter(userData.email_newsletter ? userData.email_newsletter : true);
  };

  const handleSubmit = async () => {
    setLoadingSubmit(true);

    const newUserData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      email_newsletter: newsletter,
    };

    const response = await upsertUserData(newUserData);

    console.log(response);

    setLoadingSubmit(false);
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
                value={firstName}
                onChange={(n) => setFirstName(n.target.value)}
              />
            </div>

            <div className="profile-input-with-header">
              <h3>Last Name</h3>
              <input
                type="text"
                className="profile-input"
                value={lastName}
                onChange={(n) => setLastName(n.target.value)}
              />
            </div>

            <div className="profile-input-with-header">
              <h3>Contact Email</h3>
              <input
                type="text"
                className="profile-input"
                value={email}
                onChange={(n) => setEmail(n.target.value)}
              />
            </div>

            <div className="profile-switch-with-header">
              <h3>Recieve Newsletter</h3>
              <div className="profile-switch">
                <Switch
                  checked={newsletter}
                  onChange={(n) => setNewsletter(n.target.checked)}
                  size="medium"
                />
              </div>
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

        <div className="profile-submit-section">
          <button
            onClick={() => handleSubmit()}
            className="profile-submit-section-button">
            <h3>Submit</h3>
          </button>
        </div>

        {loadingSubmit ? (
          <div className="profile-loading">
            <Loading />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Profile;
