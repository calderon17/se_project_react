import "./SideBar.css";
import avatar from "../../images/avatar.png";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useContext } from "react";

function SideBar() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        src={currentUser?.avatar || avatar}
        alt={currentUser?.name}
        className="sidebar__avatar"
      />
      <p className="sidebar__username">{currentUser?.name || "Loading..."}</p>
    </div>
  );
}

export default SideBar;
