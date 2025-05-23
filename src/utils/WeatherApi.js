const API_KEY = "32a5bb7b9aa1126387e06acad817149e";
const API_URL_CURRENT = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;
const API_URL_3HOURS = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric`;
const weatherApi = {
  getTodayData(city) {
    return fetch(API_URL_CURRENT + "&q=" + city)
      .then((response) => {
        return response.json();
      })
      .then((data) => ({
        temp: parseInt(data.main.temp, 0),
        weatherDescription: data.weather[0].description,
        weatherIcon: this.getIconUrl(data.weather[0].icon),
        country: data.sys.country,
        timezone: data.timezone,
        time: this.formatDate(data.dt, data.timezone, "time"),
        weekday: this.formatDate(data.dt, data.timezone, "weekday"),
        city: data.name,
      }))
      .catch((error) => {
        return [];
      });
  },
  get3HoursData(city) {
    return fetch(API_URL_3HOURS + "&q=" + city)
      .then((response) => {
        return response.json();
      })
      .then((data) =>
        data.list.map((list) => ({
          max: parseInt(list.main.temp_max, 0),
          min: parseInt(list.main.temp_min, 0),
          time: this.formatDate(list.dt, data.city.timezone, "time"),
          weekday: this.formatDate(list.dt, data.city.timezone, "weekday"),
          weather_icon: this.getIconUrl(list.weather[0].icon),
        }))
      )
      .catch((error) => {
        return [];
      });
  },
  getWeeklyData(forecastWeekly) {
    var uniqueDay = [];

    forecastWeekly.map((element) => {
      var isDuplicated = uniqueDay.hasOwnProperty(element.weekday);
      if (isDuplicated) {
        if (element.min < uniqueDay[element.weekday].min) {
          uniqueDay[element.weekday].min = element.min;
        }
        if (element.max > uniqueDay[element.weekday].max) {
          uniqueDay[element.weekday].max = element.max;
        }
      } else {
        uniqueDay[element.weekday] = element;
      }
    });
    return Object.values(uniqueDay);
  },

  formatDate(utc, timezone, format) {
    const dt_timezone = new Date(utc * 1e3 + timezone * 1e3).toISOString();
    const dt = new Date(dt_timezone.substr(0, 19));
    if (format === "day") {
      return new dt.getDate();
    } else if (format === "time") {
      const hr = parseInt(dt_timezone.substr(11, 2), 0);
      if (hr === 12) {
        return "12pm";
      } else if (hr === 0) {
        return "12am";
      } else {
        return hr > 12 ? hr - 12 + "pm" : hr + "am";
      }
    } else if (format === "weekday") {
      return dt.toLocaleTimeString("en-us", { weekday: "long" }).split(" ")[0];
    }
  },

  getIconUrl(icon) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  },
};

export default weatherApi;
