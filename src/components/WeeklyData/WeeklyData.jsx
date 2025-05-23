import React from "react";
import "./WeeklyData.css";
import weatherApi from "../../utils/WeatherApi";
import { connect } from "react-redux";

class WeeklyData extends React.Component {
  constructor(props) {
    super(props);
    this.getWeeklyData = this.getWeeklyData.bind(this);
  }

  getWeeklyData(forecastWeekly) {
    return weatherApi.getWeeklyData(forecastWeekly);
  }

  convertTemp(temp) {
    if (this.props.temperatureUnit === "Fahrenheit") {
      return `${((temp * 9) / 5 + 32).toFixed(1)}°F`;
    }
    return `${temp}°C`;
  }

  render() {
    const weeklyData = this.getWeeklyData(this.props.forecastWeekly);

    return (
      <div className="row rowWeeklyData">
        <div className="table-responsive">
          <div className="table table-borderless">
            <div>
              <div className="tablee">
                {weeklyData.map((forecast) => (
                  <div className="child" key={forecast.weekday}>
                    <div>{forecast.weekday}</div>
                    <div className="weeklyData">
                      <img src={forecast.weather_icon} alt="" />
                    </div>
                    <div className="weeklyData">
                      {this.convertTemp(forecast.max)} |{" "}
                      {this.convertTemp(forecast.min)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Connect to Redux to get temperatureUnit
const mapStateToProps = (state) => ({
  temperatureUnit: state.settings.temperatureUnit,
});

export default connect(mapStateToProps)(WeeklyData);
