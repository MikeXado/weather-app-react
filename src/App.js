import React, { useState, useEffect } from "react";
import "./App.scss";
import { Forecastcard } from "./componets/forescastCard";
import { Highlightscard } from "./componets/highlightsCard";
import { Map } from "./pages/map";
import { Routes, Route, NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import weatherGif from "./img/weather2.gif";
import searchGif from "./img/search2.gif";
import wind from "./img/highlights/wind.png";
import humidity from "./img/highlights/humidity1.png";
import precipitation from "./img/highlights/precipitation.png";
import feelLike from "./img/highlights/feelsLike.png";
import pressure from "./img/highlights/pressure.png";
import visibility from "./img/highlights/visibility.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
function App() {
  const [getState, setGetState] = useState(() => {
      const saved = localStorage.getItem("location");
      const initialValue = JSON.parse(saved);
      return initialValue || "Chisinau";
    }),
    [state, setState] = useState(() => {
      const saved = localStorage.getItem("location");
      const initialValue = JSON.parse(saved);
      return initialValue || "Chisinau";
    }),
    [weather, setWeather] = useState({}),
    [select, setSelect] = useState(""),
    [currentForecast, setCurrentForecast] = useState(),
    [highlights, setHighlights] = useState([]),
    errorDiv = document.querySelector(".search-weather__error"),
    Api = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${state}&days=10&aqi=yes&alerts=yes`;

  useEffect(() => {
    fetch(Api)
      .then((response) => response.json())
      .then((weather) => setWeather(weather));
  }, [Api]);

  useEffect(() => {
    localStorage.setItem("location", JSON.stringify(state));
  }, [state]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  useEffect(() => {
    const find =
      weather?.forecast &&
      weather?.forecast.forecastday.find((day) => {
        return day.date === select;
      });
    setCurrentForecast(find);
  }, [weather, select]);

  return (
    <div className="wrapper">
      <div className="weather-app">
        <div className="weather-app__container">
          <div className="weather-app__content content-weather">
            <div className="content-weather__search section">
              <div className="search-weather">
                <div className="search-weather__input">
                  <img
                    className="search-weather__icon"
                    src={searchGif}
                    alt="search"
                  />
                  <input
                    className="input"
                    type="text"
                    placeholder="e.g London or London,UK..."
                    onKeyUp={(e) => {
                      if (e.keyCode === 13) {
                        if (e.target.value.length <= 2) {
                          errorDiv.innerHTML = "please enter a location name";
                        } else {
                          errorDiv.innerHTML = "";
                          submitHandler();
                        }
                      }
                    }}
                    onChange={inputHandler}
                    value={getState}
                  />
                </div>
                <div className="search-weather__error">
                  <div className="input-error"></div>
                </div>
              </div>
              <div className="current-weather">
                <img
                  className="current-weather__icon"
                  src={weather.current?.condition.icon}
                  alt="today-weather-icon"
                />
                <div className="current-weather__temp">
                  {Math.floor(weather.current?.temp_c)}&deg;C
                </div>
                <div className="current-weather__day-name">
                  {weather.current?.last_updated}
                </div>
                <div className="current-weather__comment">
                  {weather.current?.condition.text}
                </div>
                <div className="region-weather">
                  <img src={weatherGif} alt="gif" />
                  <div className="region">{weather.location?.name}</div>
                </div>
              </div>
            </div>

            <div className="content-weather__info weather-info section">
              <div className="links">
                <ul className="weather-info__links-body">
                  <li className="weather-info__links-item">
                    <NavLink to="" className="weather-info__link">
                      Weather
                    </NavLink>
                  </li>
                  <li className="weather-info__links-item">
                    <NavLink to="map" className="weather-info__link">
                      Map
                    </NavLink>
                  </li>
                </ul>
                <div className="select-day">
                  <select
                    onChange={(e) => {
                      setSelect(e.target.value);
                    }}
                  >
                    <option value="none">Choose a day</option>
                    {weather.forecast?.forecastday.map((item, index) => {
                      return (
                        <option key={index} value={item.date}>
                          {item.date}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <Routes>
                <Route
                  path=""
                  element={
                    <div className="weather-info__content">
                      <div className="weather-info__forecast">
                        <Swiper
                          spaceBetween={30}
                          slidesPerView={4}
                          observer={true}
                          observeParents={true}
                          speed={800}
                          breakpoints={{
                            320: {
                              slidesPerView: 1,
                              spaceBetween: 0,
                              autoHeight: true,
                            },
                            768: {
                              slidesPerView: 2,
                              spaceBetween: 20,
                            },
                            992: {
                              slidesPerView: 3,
                              spaceBetween: 20,
                            },
                            1268: {
                              slidesPerView: 4,
                              spaceBetween: 30,
                            },
                          }}
                        >
                          {currentForecast?.hour.map((item, index) => {
                            return (
                              <SwiperSlide key={index}>
                                <Forecastcard
                                  dayName={item.time}
                                  forecastIcon={item?.condition.icon}
                                  maxTemp={item.temp_c}
                                />
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      </div>
                      <div className="weather-info__highlight">
                        <Highlightscard
                          cardName="Feels Like"
                          cardIcon={feelLike}
                          cardData={weather.current?.feelslike_c + "\u00b0C"}
                        />
                        <Highlightscard
                          cardName="Pressure"
                          cardIcon={pressure}
                          cardData={weather.current?.pressure_mb + "hPa"}
                        />
                        <Highlightscard
                          cardName="Visibility"
                          cardIcon={visibility}
                          cardData={weather.current?.vis_km + " km"}
                        />
                        <Highlightscard
                          cardName="Wind Status"
                          cardIcon={wind}
                          cardData={weather.current?.wind_kph + " km/h"}
                        />
                        <Highlightscard
                          cardName="Humidity"
                          cardIcon={humidity}
                          cardData={weather.current?.humidity + "%"}
                        />
                        <Highlightscard
                          cardName="Precipitation"
                          cardIcon={precipitation}
                          cardData={weather.current?.precip_mm + " mm"}
                        />
                      </div>
                    </div>
                  }
                />

                <Route path="map" element={<Map />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
