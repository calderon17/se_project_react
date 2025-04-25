import "./SideBar.css";
import avatar from "../../images/avatar.png";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useContext } from "react";

function SideBar() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        src={currentUser.avatar || avatar}
        alt={currentUser.name}
        className="sidebar__avatar"
      />
      <p className="sidebar__username">{currentUser.name}</p>
      {/* <img className="sidebar__avatar" src={avatar} alt="Default avatar" /> */}
      {/* <p className="sidebar__username">User name</p> */}
    </div>
  );
}

export default SideBar;
