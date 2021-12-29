import React from "react";
import MyLocationTwoToneIcon from '@mui/icons-material/MyLocationTwoTone';
import "./CSS-modules/weatherPanel.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function MainWeather(props){

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(locationSearch);
        } else{
            prompt("loctaion required")
        }
      }

    function locationSearch(pos){
        const  {latitude:lat, longitude:lon} = pos.coords
        const position = {lat: lat, lng: lon}
        props.searchLoc(position)
    }

    return(
        <div className = "weather-panel" style={{backgroundImage:"url(/images/Cloud-background.png)"}}>
            <div className="panel-buttons">
                <button onClick = {()=>props.showPanel()} className = "btn btn-secondary">Search for Cities</button>
                <button onClick = {getLocation} id="location" className = "btn btn-secondary btn-circle"> <MyLocationTwoToneIcon/> </button>
            </div>
            <div className="panel-img" >
                <img src={`http://openweathermap.org/img/wn/${props.data.iconId}@2x.png`} alt={props.data.weatherDesc}/>
            </div>
            <div className="panel-temp">
                <p>{Math.round(props.data.temp)}</p><span>°C</span>
            </div>
            <div className="panel-weather">{props.data.weatherDesc}</div>
            <div className="panel-info">
                <div className="daytime">
                    <span>Today</span>
                    <span>·</span>
                    <span>{props.data.currDay}</span>
                </div>
                <p className="location"> <span><LocationOnIcon /></span> Darbhanga</p>
            </div>
        </div>
    )
}