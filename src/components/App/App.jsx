import { useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { use } from "react";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("");

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
      <ModalWithForm
        title="New garmet"
        buttonText="Add garment"
        activeModal={activeModal}
        handleCloseClick={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="ImageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select weather type</legend>
          <label htmlFor="hot" className="modal__labe modal__label_type_radio">
            <input id="hot" type="radio" className="modal__radio-input" />
            hot
          </label>
          <label htmlFor="warm" className="modal__labe modal__label_type_radio">
            <input id="warm" type="radio" className="modal__radio-input" />
            warm
          </label>
          <label htmlFor="cold" className="modal__labe modal__label_type_radio">
            <input id="cold" type="radio" className="modal__radio-input" />
            cold
          </label>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;
