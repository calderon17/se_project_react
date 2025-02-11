import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { use } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    // isDay: False,
  });

  // const is weatherloaded
  // ^ extra work to have loadded text when refreshing
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([defaultClothingItems]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleswitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card); //not defined
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    setClothingItems([{ name, link: imageUrl, weather }, ...clothingItems]);
    closeActiveModal();
    debugger;
  };
  useEffect(() => {
    setClothingItems(defaultClothingItems);
    getWeather(coordinates, APIkey)
      .then((data) => {
        // data.weather[0].main = "Clear";

        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleswitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            clothingItems={clothingItems}
          />
          <Footer />
        </div>
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
