import { use, useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { handleToggleswitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleswitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
      />
      <span className="toggle-switch__circle"></span>
      <span className="toggle-switch__text toggle-switch__text-F">F</span>
      <span className="toggle-switch__text toggle-switch__text-C">C</span>
    </label>
  );
}
