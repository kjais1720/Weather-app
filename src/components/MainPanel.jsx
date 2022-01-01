import React, {useState, useEffect} from "react";
import "./CSS-modules/mainPanel.css";
import WeatherCard from "./WeatherCard";
import NavigationIcon from '@mui/icons-material/Navigation';
import {windDir, tempConversion} from './convertDate';
import LocationOnIcon from '@mui/icons-material/LocationOn';


export default function MainPanel(props){
    const [weeklyData, setWeeklyData] = useState([]);

    useEffect(()=>{
        setWeeklyData(props.data.weekData);
    },[props.data]);

    const [useCelsius, setUseCelsius] = useState(true);

    function changeTemp(e){
        const currUnit = useCelsius ? "°C" : "°F";
        if (e.target.innerText === currUnit) return;
        
        setUseCelsius(!useCelsius);
        
        const unit = useCelsius ? "F" : "C";
        const newData = weeklyData.map(day=>{
            day.highT = tempConversion(day.highT, unit);
            day.lowT = tempConversion(day.lowT, unit);
            return day;
        })
        setWeeklyData(newData);
    }

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
                unit = {useCelsius ? "C" : "F"}
            />
        )
    }
    

    return(
        <main>
            <header>
                <h1 className="location-city"><LocationOnIcon/> <span>{props.data.currCity}</span></h1>
                <div className="temp-buttons">
                    <button 
                        className={useCelsius?"active":""}
                        onClick={changeTemp}
                    >
                        °C
                    </button>
                    <button
                        className={useCelsius?"":"active"}
                        onClick={changeTemp}
                    >
                        °F
                    </button> 
                </div>
            </header>
            <div className="weather-cards">
                {weeklyData.map((e,i)=>createCard(e,i))}
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
            <footer>
                <p>Powered by <a href="https://openweathermap.org/">OpenWeatherMap</a></p>
                <p>Made with <span>React</span> by <a href="https://krituraj-anand.vercel.app" target="_blank" rel="noreferrer">Krituraj Anand</a></p>
            </footer>
        </main>
    )
}