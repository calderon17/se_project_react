import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function LoginModal({
  onClose,
  isOpen,
  onLogin,
  onSwitchModal,
}) {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

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

  useEffect(() => {
    setIsFormValid(
      email.length > 0 && password.length > 0 && email.includes("@") // basic email validation
    );
  }, [email, password]);

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      modalType="login"
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
          or Sign up
        </button>
      }
    >
      {errorMessage && (
        <div className="modal__error-message">{errorMessage}</div>
      )}
      <label htmlFor="email" className="modal__label modal__label-email">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="login-email"
          placeholder="email"
          required
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="password" className="modal__label modal__label-password">
        Password{" "}
        <input
          type="password"
          name="password"
          className={`modal__input ${
            errorMessage ? "modal__input_type_error" : ""
          }`}
          id="login-password"
          placeholder="password"
          autoComplete="username"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
    </ModalWithForm>
  );
}
