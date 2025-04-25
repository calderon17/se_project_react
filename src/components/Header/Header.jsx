import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Header({
  handleAddClick,
  weatherData,

  setActiveModal,
}) {
  // const { currentUser /*handleLogout*/ } = useContext(CurrentUserContext);

  const currentUser = useContext(CurrentUserContext);

  // const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <header className="header">
        <div className="header__left">
          <Link to="/">
            <img className="header__logo" src={logo} alt="header logo" />
          </Link>
          <p className="header__date-and-location">
            {currentDate}, {weatherData.city}
          </p>
        </div>

        <div className="header__right">
          <ToggleSwitch />

          {currentUser ? (
            <>
              <button
                onClick={handleAddClick}
                type="button"
                className="header__add-clothes-btn"
              >
                + Add clothes
              </button>

              <Link to="/profile" className="header__link">
                <div className="header__user-container">
                  <p className="header__username">{currentUser.name}</p>
                  <img
                    src={currentUser.avatar || avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                </div>
              </Link>
            </>
          ) : (
            <div className="header__auth-buttons">
              <button
                className="header__button"
                onClick={() => setActiveModal("register")} // Instead of setIsSignUpModalOpen(true)
              >
                Sign Up
              </button>
              <button
                className="header__button"
                onClick={() => setActiveModal("login")} // Instead of setIsLoginModalOpen(true)
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </header>
      {/* <RegisterModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      /> */}
      {/* <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
      /> */}
    </>
  );
}

export default Header;
