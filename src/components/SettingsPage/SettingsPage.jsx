import React, { use } from "react";
import { connect, useSelector } from "react-redux";
import {
  setTemperatureUnit,
  setSelectedCategories,
} from "../../reducers/settingsReducer";
import "./SettingsPage.css";

const SettingsPage = ({
  temperatureUnit,
  selectedCategories,
  setTemperatureUnit,
  setSelectedCategories,
}) => {
  const handleUnitChange = (event) => {
    setTemperatureUnit(event.target.value);
  };
  const state = useSelector((state) => state);
  console.log(state, "state");
  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategories([selected]);
  };

  const categories = [
    "general",
    "world",
    "nation",
    "business",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
  ];

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-item">
        <label>Temperature Unit:</label>
        <select value={temperatureUnit} onChange={handleUnitChange}>
          <option value="Celsius">Celsius</option>
          <option value="Fahrenheit">Fahrenheit</option>
        </select>
      </div>

      <div className="settings-item">
        <label>News Category:</label>
        <select
          value={selectedCategories[0] || ""}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  temperatureUnit: state.settings.temperatureUnit,
  selectedCategories: state.settings.selectedCategories,
});

const mapDispatchToProps = {
  setTemperatureUnit,
  setSelectedCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
