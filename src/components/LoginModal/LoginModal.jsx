import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function LoginModal({ onClose, isOpen, onLogin }) {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password })
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        setErrorMessage("Invalid email or password. Please try again.");
      });
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
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
    </ModalWithForm>
  );
}
