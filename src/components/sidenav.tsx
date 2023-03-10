import Button from "./sub-components/navButton";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import CreatePostModal from "./createPostModal";

function SideNav(_props: any) {
  const { user, googleSignIn, logOut } = UserAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);

  useEffect(() => {
    console.log("USER", user);
    setDisplay(user !== null);
  }, [user]);

  const hidden = <></>;
  const visible = (
    <div className="sidenav-container">
      {showModal && (
        <CreatePostModal
          closeModal={() => {
            setShowModal(false);
          }}
        />
      )}
      <div className="sidenav-section-1">
        <img src="./icons/TempLogo.svg" alt="Logo" className="sidenav-logo" />
      </div>

      <div className="sidenav-section-2">
        <Button
          text="+"
          onClick={() => {
            setShowModal(true);
          }}
          primary={true}
          icon={false}
        />

        <Button
          text="./icons/BurgerIcon.svg"
          onClick={() => {
            navigate("/");
          }}
          primary={false}
          icon={true}
        />

        <Button
          text="./icons/User.svg"
          onClick={() => {
            navigate("/profile");
          }}
          primary={false}
          icon={true}
        />
      </div>

      <div className="sidenav-section-3">
        {user === null ? (
          <Button
            text="./icons/User.svg"
            onClick={() => {
              googleSignIn();
            }}
            primary={false}
            icon={true}
          />
        ) : (
          <button
            className="sidenav-user-icon-button"
            onClick={() => {
              logOut();
            }}>
            <img src={user.photoURL} alt="User" className="sidenav-user-icon" />
          </button>
        )}
      </div>
    </div>
  );

  if (display) {
    return visible;
  } else {
    return hidden;
  }
}

export default SideNav;
