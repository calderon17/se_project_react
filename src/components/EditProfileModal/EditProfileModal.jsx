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
      setErrorMessage(
        "Please enter a valid image URL (.jpg, .jpeg, .png, .gif, .bmp)"
      );
      return;
    }
    const token = getToken();
    updateProfile(name, avatar, token)
      .then((data) => {
        handleUpdate(data);
        onClose();
        setName("");
        setAvatar("");
      })
      .catch((err) => {
        setErrorMessage("Invalid name or avatar. Please try again.");
      });
  };

  const validateImageURL = (url) => {
    if (!url) return false;

    try {
      new URL(url);
      const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
      return imageExtensions.some((extension) =>
        url.toLowerCase().endsWith(extension)
      );
    } catch (error) {
      return false;
    }
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Edit Profile"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      {errorMessage && (
        <div className="modal__error-message">{errorMessage}</div>
      )}
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatar"
          placeholder="avatar"
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}
