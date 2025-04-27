import "./ModalWithForm.css";
import close from "../../images/closeGarment.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  isFormValid,
  switchButton,
  modalType,
  // activeModal,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className={`modal__content modal__content_type_${modalType}`}>
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__button-container">
            <button
              type="submit"
              className={`modal__submit ${
                isFormValid ? "modal__submit_filled" : ""
              }`}
            >
              {buttonText}
            </button>
            {switchButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
