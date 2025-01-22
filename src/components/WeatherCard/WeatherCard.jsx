import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  // debugger;
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  // console.log(1);
  // console.log(defaultWeatherOptions["day"]);

  // const weatherOptionUrl = filteredOptions[0]?.url;
  // const weatherOptionCondition = filteredOptions[0]?.condition;
  // const weatherOptionDay = filteredOptions[0]?.isDay;

  // debugger;
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{Math.round(weatherData.temp.F)} °F</p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"} time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
