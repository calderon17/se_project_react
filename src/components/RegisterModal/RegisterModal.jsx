import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function RegisterModal({ onClose, isOpen, onRegister }) {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(""); // Optional field
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password, name, avatar })
      .then(() => {
        setEmail("");
        setPassword("");
        setName("");
        setAvatar("");

        onClose();
      })
      .catch((err) => {
        setErrorMessage("Invalid email or password. Please try again.");
      });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="email"
          placeholder="email"
          required
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="password"
          placeholder="password"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
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
          type="link"
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
