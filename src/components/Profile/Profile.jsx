import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
// import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useContext, useState } from "react";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  // const handleEditProfileClick = () => {
  //   setIsEditProfileModalOpen(true);
  // };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <button
          className="profile__update-data
        "
          onClick={handleEditProfileClick}
        >
          Change Profile Data
        </button>
        <button className="profile__sign-out" onClick={handleSignOut}>
          Sign out
        </button>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
      />
    </div>
  );
}

export default Profile;
