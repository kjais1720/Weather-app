import React,{useEffect} from "react";
import MyLocationTwoToneIcon from '@mui/icons-material/MyLocationTwoTone';
import "./CSS-modules/weatherPanel.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from "axios";

export default function MainWeather(props){

    useEffect(()=>{
        getLocation();
    },[]);


    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(locationSearch);
        } else{
            prompt("loctaion required")
        }
      }

    async function getCityFromCoords(coords){
        const apiKey=process.env.REACT_APP_GEOCODE_API;
        const path = `https://api.opencagedata.com/geocode/v1/json?q=${coords.lat+"%2C"+coords.lng}&key=${apiKey}`;
        const {data} = await axios.get(path) 
        console.log(data.results[0].components.city);
        const city = data.results[0].components.city || data.results[0].components.state_district;
        props.setLocation(city);
        return(city);
    }

    function locationSearch(pos){
        const  {latitude:lat, longitude:lon} = pos.coords
        const position = {lat: lat, lng: lon};
        // props.setLocation("Your loc")
        const cityName = getCityFromCoords(position);
        props.searchLoc(position, "cityName");
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
                <p className="location"> <span><LocationOnIcon /></span> {props.data.currCity}</p>
            </div>
        </div>
    )
}