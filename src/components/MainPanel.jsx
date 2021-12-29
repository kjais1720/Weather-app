import React from "react";
import "./CSS-modules/mainPanel.css";
import WeatherCard from "./WeatherCard";
import NavigationIcon from '@mui/icons-material/Navigation';
import {windDir} from './convertDate';


export default function MainPanel(props){
    // const weatherInfo = [
    //     {
    //         day:"Tomorrow",
    //         img:"Clear.png",
    //         high:16,
    //         low:12

    //     },
    //     {
    //         day:"Sun, 26 Dec",
    //         img:"Clear.png",
    //         high:16,
    //         low:12

    //     },
    //     {
    //         day:"Mon, 27 Dec",
    //         img:"Clear.png",
    //         high:16,
    //         low:12

    //     },
    //     {
    //         day:"Tue, 28 Dec",
    //         img:"Clear.png",
    //         high:16,
    //         low:12

    //     },
    //     {
    //         day:"Wed, 29 Dec",
    //         img:"Clear.png",
    //         high:16,
    //         low:12

    //     }
    // ]
    function createCard(card,i){
        if(i>=1 && i<6)
        return(
            <WeatherCard
                id = {i-1}
                key={i}
                day = {card.day}
                img = {card.icon}
                high = {card.highT}
                low = {card.lowT}
                alt = {props.data.weatherDesc}
            />
        )
    }

    return(
        <main>
            <div className="temp-buttons">
                <button className="active">°C</button>
                <button>°F</button>
            </div>
            <div className="weather-cards">
                {props.data.weekData.map((e,i)=>createCard(e,i))}
            </div>
            <div className="highlights">
                <div className = "highlights-heading">
                    <h2>Today's highlights</h2>
                </div>
                <div className = "highlight-cards">
                    <div className = "card">
                        <h3>Wind status</h3>
                        <div className="card-info">
                            <span className="info-main">{Math.round(props.data.windStatus.speed * (18/5))} </span><span>Kmph</span>
                        </div>
                        <div className="wind-dir">
                            <div className="circle" style={{transform:`rotate(${-props.data.windStatus.dir}deg)`}}>
                                <NavigationIcon/>
                            </div>
                            <p>{windDir(props.data.windStatus.dir)}</p>
                        </div>
                    </div> 
                    <div className = "card">
                        <h3>Humidity</h3>
                        <div className="card-info">
                            <span className="info-main">{props.data.humidity} </span><span>%</span>
                        </div>
                        <div className="humidity">
                            <label htmlFor="hum-progress">
                                <span>0</span>
                                <span>50</span>
                                <span>100</span>
                            </label>
                            <progress id="hum-progress" value={`${props.data.humidity}`} min="0" max="100">{`${props.data.humidity}%`}</progress>
                            <span>% </span>
                        </div>
                    </div>
                    <div className = "card">
                        <h3>Visibility</h3>
                        <div className="card-info">
                            <span className="info-main">{props.data.visibility / 1000} </span><span>Km</span>
                        </div>
                        
                    </div>
                    <div className = "card">
                        <h3>Air Pressure</h3>
                        <div className="card-info">
                            <span className="info-main">{props.data.airPressure} </span><span>mb</span>
                        </div>
                        
                    </div>
                </div>

            </div>
        </main>
    )
}