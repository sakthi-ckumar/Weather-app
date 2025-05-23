import React from "react";
import "./TodayData.css";
import WeeklyData from "../WeeklyData/WeeklyData";
import GetGraph from "../GetGraph/GetGraph";
import { useSelector } from "react-redux";

const TodayData = (props) => {
  const state = useSelector((state) => state.settings);

  const tempInFahrenheit = ((props.temp * 9) / 5 + 32).toFixed(1);

  return (
    <div className="container weatherData border rounded">
      <div className="details">
        <div className="text">
          <div className="row currentCity justify-content-left">
            {props.city}, {props.country}
          </div>
          <div className="row currentDay">
            {props.weekday} {props.time}
          </div>
          <div className="row currentDesc justify-content-left">
            {props.weatherDescription}
          </div>
        </div>
        <div>
          <div className="row currentTemp" id="icon-side">
            <div className="currentTempIcon">
              <img src={props.weatherIcon} alt="" width="100%" height="100%" />
            </div>
            <div>
              {state.temperatureUnit === "Fahrenheit" ? (
                <>
                  {tempInFahrenheit}
                  <span className="fahrenheit">&#x2109;</span>
                </>
              ) : (
                <>
                  {props.temp}
                  <span className="celsius">&#x2103;</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <GetGraph forecast3hrs={props.forecast3hrs} /> */}
      <WeeklyData forecastWeekly={props.forecastWeekly} />
    </div>
  );
};

export default TodayData;
