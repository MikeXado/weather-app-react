import React from 'react';


function Forecastcard(props) {
    return (<div className="weather-info__forecast-day">
    <div className="weather-info__forecast-day-name">{props.dayName}</div>
    <div className="weather-info__forecast-day-icon"><img src={props.forecastIcon} alt="forecastIcon" /></div>
    <div className="weather-info__forecast-day-temp day-temp">
        <div className="day-temp__morning">{props.maxTemp}&deg;C</div>        
    </div>
  </div>
    );
  }



export {Forecastcard};
