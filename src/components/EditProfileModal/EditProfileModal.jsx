import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { updateProfile } from "../../utils/api.js";
import { getToken } from "../../utils/auth.js";

export default function EditProfileModal({ onClose, isOpen }) {
  // State for form fields
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { handleUpdate, currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    }
  }, [isOpen, currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateImageURL(avatar)) {
      setErrorMessage("Please enter a valid image URL");
      return;
    }
    const token = getToken();
    updateProfile(name, avatar, token)
      .then((data) => {
        console.log(data);
        handleUpdate(data);
        onClose();
        setName("");
        setAvatar("");
      })
      .catch((err) => {
        setErrorMessage("Invalid name or avatar. Please try again.");
        console.log(err);
      });
  };

  const validateImageURL = (url) => {
    if (!url) return false;

    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Edit Profile"
      modalType="editprofile"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      {errorMessage && (
        <div className="modal__error-message">{errorMessage}</div>
      )}
      <label htmlFor="edit-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="edit-avatar" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="edit-avatar"
          placeholder="avatar"
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}
