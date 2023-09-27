import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RiNavigationFill } from 'react-icons/ri';

import '../styles/weatherWeek.css';

export const WeatherWeek = ({ sendCountry }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [degrees, setDegrees] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = '23900739282741c2ff484b13f7fe2b0a';

  const weatherWeek = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${sendCountry}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    weatherWeek()
      .then((responseData) => {
        setWeatherData(responseData);
      })
      .catch((error) => {
        setError(error);
      });
  }, [sendCountry]);

  const handleDegrees = () => {
    setDegrees(!degrees);
  };

  const handleImg = (condition) => {
    return `https://openweathermap.org/img/wn/${condition}.png`;
  };

  const getFiveDays = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const fiveDays = [];

    for (let i = 1; i <= 5; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const dayOfWeek = daysOfWeek[nextDay.getDay()];
      const date = nextDay.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
      });
      fiveDays.push(`${dayOfWeek}, ${date}`);
    }

    return fiveDays;
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <section className='weather-week'>
        {weatherData ? (
          <div className='div-content-weather-week'>
            {window.innerWidth > 768 ? (
              <div className='div-degrees'>
                <button className='button-degrees' onClick={handleDegrees}>
                  °C
                </button>
                <button className='button-degrees' onClick={handleDegrees}>
                  °F
                </button>
              </div>
            ) : null}
            <div className='div-weather-week-info'>
              {weatherData.list.slice(0, 5).map((forecast, index) => (
                <div className='div-day-weather-info' key={index}>
                  <p className='p-div-day-weather-info'>
                    {index === 0 ? 'Tomorrow' : getFiveDays()[index]}
                  </p>
                  <img
                    className='img-weather-info'
                    src={handleImg(forecast.weather[0].icon)}
                    alt='img-weather'
                  />
                  <div className='div-day-degrees-info'>
                    <p className='p-div-day-degrees-info'>
                      {degrees
                        ? Math.round(forecast.main.temp_max)
                        : Math.round((forecast.main.temp_max * 9) / 5 + 32)}
                      <strong className='strong-div-day-degrees-info'>
                        °{degrees ? 'C' : 'F'}
                      </strong>
                    </p>
                    <p className='p-div-day-degrees-info'>
                      {degrees
                        ? Math.round(forecast.main.temp_min)
                        : Math.round((forecast.main.temp_min * 9) / 5 + 32)}
                      <strong className='strong-div-day-degrees-info'>
                        °{degrees ? 'C' : 'F'}
                      </strong>
                    </p>
                  </div>
                  <div className='div-wind-status'>
                    <div className='div-icon-wind-status'>
                      <RiNavigationFill className='icon-wind-status' style={{ transform: `rotate(${forecast.wind.deg}deg)` }} />
                    </div>
                    <p className='p-wsw-wind-status'>
                      {forecast.wind.deg}°
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className='div-Today-Highlights'>
              <h2>Today’s Highlights</h2>
              <div className='div-tag-day-weather-info'>
                <div className='div-tag-day-weather1'>
                  <p className='p-wind-status'>Wind Status</p>
                  <h2 className='h2-wind-status'>
                    <strong className='strong-wind-status'>
                      {weatherData.list[0].wind.speed}
                    </strong>
                    {degrees ? 'm/s' : 'mph'}
                  </h2>
                  <div className='div-wind-status'>
                    <div className='div-icon-wind-status'>
                      <RiNavigationFill className='icon-wind-status' style={{ transform: `rotate(${weatherData.list[0].wind.deg}deg)` }} />
                    </div>
                    <p className='p-wsw-wind-status'>
                      {weatherData.list[0].wind.deg}°
                    </p>
                  </div>
                </div>
                <div className='div-tag-day-weather1'>
                  <p className='p-humidity'>Humidity</p>
                  <h2 className='h2-humidity'>
                    {weatherData.list[0].main.humidity}%
                  </h2>
                  <div className='div-rod-humidity'>
                    <div className='div-percentage-humidity'>
                      <p>0</p>
                      <p>50</p>
                      <p>100</p>
                    </div>
                    <div className='div1-percentage-bar-humidity'>
                      <div
                        className='div2-percentage-bar-humidity'
                        style={{
                          '--w': `${weatherData.list[0].main.humidity}%`,
                        }}
                      />
                    </div>
                    <p className='p-percentage-humidity'>%</p>
                  </div>
                </div>
                <div className='div-tag-day-weather2'>
                  <p className='p-tag-day-weather2'>Visibility</p>
                  <h2 className='h2-tag-day-weather2'>
                    <strong className='strong-tag-day-weather2'>
                      {Math.round(weatherData.list[0].visibility / 1000)}
                    </strong>{' '}
                    km
                  </h2>
                </div>
                <div className='div-tag-day-weather2'>
                  <p className='p-tag-day-weather2'>Air Pressure</p>
                  <h2 className='h2-tag-day-weather2'>
                    <strong className='strong-tag-day-weather2'>
                      {Math.round(weatherData.list[0].main.pressure)}
                    </strong>{' '}
                    hPa
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='loading-data'></div>
        )}
      </section>
    </>
  );
};

WeatherWeek.propTypes = {
  sendCountry: PropTypes.string.isRequired,
};
