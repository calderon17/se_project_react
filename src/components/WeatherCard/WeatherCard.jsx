import "./WeatherCard.css";
import sunny from "../../Images/sunny.png";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} °F</p>
      <img src={sunny} alt="sunny" className="weather_card__image" />
    </section>
  );
}

export default WeatherCard;
