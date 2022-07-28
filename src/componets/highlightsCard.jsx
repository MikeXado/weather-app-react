import React from "react";


function Highlightscard(props) {
    return (
        <div className="weather-info__highlight-item">
        <div className="weather-info__highlight-name">{props.cardName}</div>
         <div className="weather-info__highlight-description">
            <img src={props.cardIcon} className="weather-info__highlight-icon desc" alt="highlight-icon" />
            <div className="weather-info__highlight-data desc">{props.cardData}</div>
         </div>
         
        </div>
    )
}

export {Highlightscard};