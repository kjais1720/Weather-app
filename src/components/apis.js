import React, {useState} from "react";
import axios from "axios";

const apiKey = "1a5d4fa64530de9ba70e6efa3328fb83";
const apiUri = "https://api.openweathermap.org/data/2.5/onecall?";

function convertDate(timestamp){
    const unixTime = timestamp*1000;
    // const date = new Date(unixTime*1000);
    let date = new Intl.DateTimeFormat('en-In', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .format(unixTime)
    // return(date.toLocaleDateString("en-In"));
    return(date);
}

async function searchCity(coords){
    const unit="metric"
    const apiPath = apiUri+`lat=${coords.lat}&lon=${coords.lng}&exclude=hourly,alerts,minutely&units=${unit}&appid=${apiKey}`
    const {data} = await axios.get(apiPath)
    if(data){
        console.log(data)
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSearch);
    }
}

function locationSearch(pos){
    const  {latitude:lat, longitude:lon} = pos.coords
    const position = {lat: lat, lng: lon}
    searchCity(position)
}

async function locToCoord(city){
    const apiKey="6a1cd25a49b441cb8fa2042a370dca8f"
    const path = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiKey}`;
    const {data} = await axios.get(path) 
    const coords = data.results[0].geometry;
    return(coords)
}

function search(){
    const coords = locToCoord();
    searchCity(coords);
}