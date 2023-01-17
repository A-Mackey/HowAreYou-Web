import { UserAuth } from "../context/AuthContext";

function Profile(_props: any) {
  const { user } = UserAuth();

  return (
    <div className="profile-container">
      <div className="profile-body">
        <div className="profile-header">
          <h1>Profile</h1>
          <button className="profile-header-logout-button">Log Out</button>
        </div>

        <div className="profile-content">
          <div className="profile-content-inputs">
            <textarea className="profile-textarea" />
          </div>

          <img src={user.photoURL} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
