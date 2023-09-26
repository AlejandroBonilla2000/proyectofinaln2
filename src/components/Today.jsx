import "../styles/today.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { BiCurrentLocation } from "react-icons/bi";

export const Today = ({ sendSearch, sendCountry }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "23900739282741c2ff484b13f7fe2b0a";

  const weatherToday = async function fetchData() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${sendCountry}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    weatherToday()
      .then((responseData) => {
        setWeatherData(responseData);
      })
      .catch((error) => {
        setError(error);
      });
  }, [sendCountry]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleImg = (condition) => {
    return condition;
  };

  const handleClick = () => {
    sendSearch(true);
  };

  const handleDate = (timestamp) => {
    const date = new Date(timestamp * 1000);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayOfWeekAbbr = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthAbbr = months[date.getMonth()];

    return `${dayOfWeekAbbr}, ${dayOfMonth} ${monthAbbr}`;
  };

  return (
    <>
      <section className="today">
        {weatherData ? (
          <div>
            <div className="div-today-search">
              <button className="button-search-places" onClick={handleClick}>
                Search for places
              </button>
              <button className="button-location">
                <BiCurrentLocation
                  style={{ color: "white", width: "100%", height: "100%" }}
                />
              </button>
            </div>

            <div className="div-today-weather">
              <img
                className="img-weather"
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="img-weather"
              />
            </div>

            <div className="div-info-weather">
              <h1 className="h1-info-weather">
                <strong className="strong-info-weather">
                  {Math.round(weatherData.main.temp)}
                </strong>
                °C
              </h1>
              <h2 className="h2-info-weather">
                {weatherData.weather[0].description}
              </h2>
              <div className="div-date-location-info-weather">
                <p className="p1-date-location-info-weather">
                  Today  •  {handleDate(weatherData.dt)}
                </p>
                <p className="p2-date-location-info-weather">
                  <FaLocationDot className="icon-date-location-info" />
                  {weatherData.name}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading-today-data"></div>
        )}
      </section>
    </>
  );
};

Today.propTypes = {
  sendSearch: PropTypes.func.isRequired,
  sendCountry: PropTypes.string.isRequired,
};