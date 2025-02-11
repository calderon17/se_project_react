import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
// import { defaultClothingItems } from "../../utils/constants";
import { useContext } from "react";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}°
          {currentTemperatureUnit} / You may want to wear:
        </p>

        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id} // Ensure this is unique
                item={item}
                onCardClick={handleCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

{
  /* <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onCardClick={handleCardClick}
              />
            ))}
        </ul> */
}
