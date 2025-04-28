import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function RegisterModal({
  onClose,
  isOpen,
  onRegister,
  onSwitchModal,
}) {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(""); // Optional field
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      email.length > 0 &&
        password.length > 0 &&
        name.length > 0 &&
        email.includes("@") // basic email validation
    );
  }, [email, password, name]);

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
      modalType="signup"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      switchButton={
        <button
          type="button"
          className="modal__submit-switch"
          onClick={onSwitchModal}
        >
          or Log in
        </button>
      }
    >
      {errorMessage && (
        <div className="modal__error-message">{errorMessage}</div>
      )}

      <label htmlFor="register-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="register-email"
          placeholder="email"
          required
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="register-password"
          placeholder="password"
          autoComplete="username"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar{" "}
        <input
          type="link"
          name="avatar"
          className="modal__input"
          id="register-avatar"
          placeholder="avatar"
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}
