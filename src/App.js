import React , {useState , useEffect} from 'react';
import './App.scss';
import {Forecastcard} from './componets/forescastCard';
import {Highlightscard} from './componets/highlightsCard';
import {Map} from './pages/map';
import {Routes , Route , NavLink} from 'react-router-dom';
import { Swiper , SwiperSlide} from 'swiper/react';
import weatherGif from './img/weather2.gif';
import searchGif from './img/search2.gif';
import wind from './img/highlights/wind.png';
import humidity from './img/highlights/humidity1.png';
import precipitation from './img/highlights/precipitation.png';
import feelLike from './img/highlights/feelsLike.png';
import pressure from './img/highlights/pressure.png';
import visibility from './img/highlights/visibility.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
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
        [weather, setWeather] = useState({}) ,
        errorDiv = document.querySelector(".search-weather__error") ,
        input = document.querySelector(".input"),
        Api = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${state}&days=10&aqi=yes&alerts=yes`;
          
        useEffect(() => {
            fetch(Api).then((response) => response.json()).then((weather) => setWeather(weather));
          } , [Api]);
        
       
        useEffect(() => {
           
            localStorage.setItem("location" , JSON.stringify(state));
        
            
        }, [state]);


         const inputHandler = (event) => {
            setGetState(event.target.value);
          };
        

       
        
        const submitHandler = () => {
          setState(getState);
        };

       
         const enter = (e) => {
          if (e.keyCode === 13) {
            if (input.value.length <= 2) {
              errorDiv.innerHTML = "please enter a location name"
           }
           else {
             errorDiv.innerHTML = ""
           submitHandler();
           }
        }
      }


  return (
    <div className="wrapper">
 
    <div className="weather-app">
     <div className="weather-app__container">
       <div className="weather-app__content content-weather">
       
          <div className="content-weather__search section">
          <div className="search-weather">
          <div className="search-weather__input">
             <img className="search-weather__icon" src={searchGif} alt="search" />
             <input className="input" type="text" placeholder="e.g London or London,UK..." onKeyUp={enter} onChange={inputHandler} value={getState}  />
           </div>
           <div className="search-weather__error">  
           <div className="input-error"></div>
           </div>
          </div>
          <div className="current-weather">
            <img className="current-weather__icon" src={weather.current?.condition.icon} alt="today-weather-icon" />
            <div className="current-weather__temp">{Math.floor(weather.current?.temp_c)}&deg;C</div>
            <div className="current-weather__day-name">{weather.current?.last_updated}</div>
            <div className="current-weather__comment">{weather.current?.condition.text}</div>
            <div className="region-weather">
              <img src={weatherGif} alt="gif" />
             <div className="region">{weather.location?.name}</div>
          </div>
          </div>
          </div>

          <div className="content-weather__info weather-info section">
            <ul className="weather-info__links-body">
               <li className="weather-info__links-item">
                 <NavLink to='/' className="weather-info__link">Weather</NavLink>
               </li>
               <li className="weather-info__links-item">
                 <NavLink to='/map' className="weather-info__link">Map</NavLink>
               </li>
            </ul>
             <Routes>
             <Route path='/weather-app-react' element={
              <div className="weather-info__content">
            <div className="weather-info__forecast" >
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
         <SwiperSlide>     
<Forecastcard
                    dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[0].time} 
                   forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[0].condition?.icon}
                    maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[0].temp_c}/>
                   </SwiperSlide>
                   
                   <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[1].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[1].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[1].temp_c}/>
                    </SwiperSlide>

                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[2].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[2].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[2].temp_c}/>
                    </SwiperSlide>

                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[3].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[3].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[3].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[4].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[4].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[4].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[5].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[5].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[5].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[6].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[6].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[6].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[7].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[7].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[7].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[8].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[8].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[8].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[9].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[9].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[9].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[10].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[10].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[10].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[11].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[11].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[11].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[12].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[12].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[12].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[13].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[13].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[13].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[14].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[14].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[14].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[15].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[15].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[15].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[16].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[16].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[16].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[17].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[17].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[17].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[18].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[18].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[18].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[19].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[19].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[19].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[20].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[20].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[20].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[21].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[21].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[21].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[22].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[22].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[22].temp_c}/>
                    </SwiperSlide>
                    <SwiperSlide>
                    <Forecastcard dayName={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[23].time} forecastIcon= {weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[23].condition?.icon} maxTemp={weather.forecast?.forecastday && weather.forecast.forecastday[0].hour && weather.forecast.forecastday[0].hour[23].temp_c}/>
          </SwiperSlide>
          </Swiper>
          </div>
            <div className="weather-info__highlight">
               <Highlightscard cardName="Feels Like" cardIcon={feelLike} cardData={weather.current?.feelslike_c + "\u00b0C"} />
               <Highlightscard cardName="Pressure" cardIcon={pressure} cardData={weather.current?.pressure_mb + "hPa"} />
               <Highlightscard cardName="Visibility" cardIcon={visibility} cardData={weather.current?.vis_km + " km"} />
               <Highlightscard cardName="Wind Status" cardIcon={wind} cardData={weather.current?.wind_kph + " km/h"} />
               <Highlightscard cardName="Humidity" cardIcon={humidity} cardData={weather.current?.humidity + "%"} />
               <Highlightscard cardName="Precipitation" cardIcon={precipitation} cardData={weather.current?.precip_mm + " mm"} />
            
            
            </div>
            </div>
             } />

             <Route path="weather-app-react/map" element={<Map />} />
            
          </Routes>
          </div>
       </div>
     </div>
    </div>
  </div>
  )
}

export default App;
