import React from 'react';

export default function WeatherCard(props){
    return(
        <div className = "card">
            <h3 className="card-heading">
                {props.id ? props.day : "Tomorrow"}
            </h3>
            <figure>
                <img src={`http://openweathermap.org/img/wn/${props.img}@2x.png`} alt={props.alt}/>
            </figure>
            <div className = "temps">
                <span className = "high">{Math.round(props.high)}°{props.unit}</span>
                <span className = "low">{Math.round(props.low)}°{props.unit}</span>
            </div>
        </div>
    )
}