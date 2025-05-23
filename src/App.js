import React, { Component } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import weatherApi from "../src/utils/WeatherApi";
import SearchBar from "../src/components/SearchBar/SearchBar";
import TodayData from "../src/components/TodayData/TodayData";
import NewsPage from "../src/components/NewsPage/NewsPage";
import SettingsPage from "../src/components/SettingsPage/SettingsPage";
import store from "./store";
import { FaHome } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTime: true,
      city: "",
      weekday: "",
      temp: "",
      weatherDescription: "",
      weatherIcon: "",
      country: "",
      timezone: "",
      time: "",
      forecast3hrs: [],
      forecastWeekly: [],
      settings: {
        temperatureUnit: "Celsius",
        selectedCategories: [],
      },
    };
    this.search = this.search.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }

  handleSettingsChange(newSettings) {
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        ...newSettings,
      },
    }));
  }

  updateTodayState = (data) => {
    this.setState({
      firstTime: false,
      temp: data.temp,
      weatherDescription: data.weatherDescription,
      weatherIcon: data.weatherIcon,
      country: data.country,
      timezone: data.timezone,
      dateTime: data.dateTime,
      time: data.time,
      weekday: data.weekday,
      city: data.city,
    });
  };

  updateWeeklyState = (data) => {
    this.setState({
      forecastWeekly: data,
      forecast3hrs: data.slice(0, 8),
    });
  };

  search(term) {
    weatherApi.getTodayData(term).then((data) => this.updateTodayState(data));
    weatherApi.get3HoursData(term).then((data) => this.updateWeeklyState(data));
  }

  warningBanner() {
    if (this.state.firstTime) return null;
    return (
      <div className="warningBanner">
        We couldn’t find any results. Try checking your spelling.
      </div>
    );
  }

  displayResult() {
    return typeof this.state.city !== "undefined" && this.state.city !== "";
  }

  renderHome = () => (
    <div className="main">
      <div className="weather-app">
        <div className="navbar-main">
          <h1>Weather</h1>
        </div>
        <SearchBar onSearch={this.search} />
        {this.displayResult() ? (
          <TodayData
            city={this.state.city}
            country={this.state.country}
            temp={this.state.temp}
            time={this.state.time}
            weekday={this.state.weekday}
            weatherDescription={this.state.weatherDescription}
            weatherIcon={this.state.weatherIcon}
            forecast3hrs={this.state.forecast3hrs}
            forecastWeekly={this.state.forecastWeekly}
          />
        ) : (
          <>
            {this.warningBanner()}
            <div className="empty-state" />
          </>
        )}
      </div>
      <div className="news-app">
        <NewsPage selectedCategories={this.state.settings.selectedCategories} />
      </div>
    </div>
  );

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <div className="nav">
              <Link to="/" style={{ textDecoration: "none" }}>
                <h1>
                  <FaHome />
                </h1>
              </Link>
              <Link to="/settings" style={{ textDecoration: "none" }}>
                <h1>
                  <IoSettings />
                </h1>
              </Link>
            </div>

            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={this.renderHome()} />
              <Route
                path="/settings"
                element={
                  <SettingsPage onSettingsChange={this.handleSettingsChange} />
                }
              />
            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
