import "./App.css";
import React, {useState} from "react";
import SearchPanel from "./components/SearchPanel";
import WeatherPanel from "./components/WeatherPanel";
import MainPanel from "./components/MainPanel"
import axios from "axios";
import {parseDate} from './components/convertDate';

function App(){

  const [parsedData, setParsedData] = useState({
    iconId:'',
    temp:0,
    weatherDesc:'',
    weekData:[{
        day:'',
        icon:'',
        highT:0,
        lowT:0,
    }],
    windStatus:{
        speed:0,
        dir:0
    },
    humidity:0,
    visibility:0,
    airPressure:0,
    currDay: ''
  })



  function parseData(data){

    let iconId, temp, weatherDesc, weekData, windStatus, humidity, visibility, airPressure, currDay;

    let t = data.current.dt;
    currDay = parseDate(t);

    iconId = data.current.weather[0].icon;
    temp = data.current.temp;
    weatherDesc = data.current.weather[0].description;

    windStatus ={
      speed: data.current.wind_speed,
      dir: data.current.wind_deg
    }
    
    humidity = data.current.humidity;
    visibility = data.current.visibility;
    airPressure = data.current.pressure;
    
    let weekWeather = data.daily;
    weekData=[];

    weekWeather.forEach(day=>{
      let dayData = {
        day: day.dt,
        icon:day.weather[0].icon,
        highT:  day.temp.max,
        lowT: day.temp.min
      }
      let dt = parseDate(day.dt);
      dayData.day = dt;
      weekData.push(dayData);
    })

    setParsedData({
      iconId:iconId,
      temp:temp,
      weatherDesc:weatherDesc,
      weekData:weekData,
      windStatus:windStatus,
      humidity:humidity,
      visibility:visibility,
      airPressure:airPressure,
      currDay: currDay
    })

  }

  const [showPanel, setShowPanel] = useState(false);
  // const apiKey = "1a5d4fa64530de9ba70e6efa3328fb83";
  // const apiKey = "58894905874dab9b6eb25f144cbfb5f0"
  const apiKey = "8ceb7094aafde1af43748692d3bbd91c";
  const apiUri = "https://api.openweathermap.org/data/2.5/onecall?";

  function closePanel(){
    setShowPanel(false)
  }

  function openPanel(){
    setShowPanel(true)
  }

  function searchCity(coords){
    const unit="metric"
    const apiPath = apiUri+`lat=${coords.lat}&lon=${coords.lng}&exclude=hourly,alerts,minutely&units=${unit}&appid=${apiKey}`
    axios.get(apiPath)
          .then(res => {
            parseData(res.data);
          })
          .catch(err=>console.log(err))
  }

  return (
    <div className="App">
      <div className = "body">
        <WeatherPanel
          showPanel = {openPanel}
          searchLoc = {searchCity}
          data = {parsedData}
        />
        <MainPanel 
          data = {parsedData}
        />
      </div>
        <SearchPanel
          showPanel = {showPanel}
          closePanel = {closePanel}
          searchCity = {searchCity}
        />
    </div>
  );
}

export default App;
