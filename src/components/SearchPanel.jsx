import React, {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from "axios";
import './CSS-modules/panel.css';

export default function SearchPanel(props){
    const [city, setCity] = useState("london, UK");

    async function locToCoord(){
        const apiKey="6a1cd25a49b441cb8fa2042a370dca8f"
        // const apiKey = "5067e7c41a514a1687754acb12d1c6f6";
        const path = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiKey}`;
        const {data} = await axios.get(path) 
        const coords = data.results[0].geometry;
        return(coords)
    }

    function changeHandler(e){
        setCity(e.target.value);
    }

    function submitHandler(e){
        e.preventDefault();
        // props.meta(city);
        searchCity();
    }

    async function searchCity(){
        const coords = await locToCoord();
        props.searchCity(coords);
    }

    const popularCities = ["New Delhi, In","London, UK", "New York, US"]

    function popSearch(cityName,i){
        return(
            <li 
                key={i}
                className="recent-search"
                data-city = {cityName}
                onClick={(e)=>{
                        setCity(e.target.getAttribute("data-city"));
                        setTimeout(searchCity,100)
                    }
                }>
                <a href="./">{cityName}</a>
                <div className="go-to"><KeyboardArrowRightIcon/></div>
            </li>
        )
    }

    // searchCity();

    return(
        <header className="hide">
            {/* <button className="search" onClick={()=>setShowPanel(true)}>Search cities</button> */}
            <div className={props.showPanel ? "container show" : "container hide"}>
                <div
                    className="close-icon"
                    style={{color:"#fff"}}
                >
                    <CloseIcon onClick={()=>props.closePanel()}/>
                </div>
                <form onSubmit = {submitHandler}>
                    <div className="input-group">
                        <div className="search-input">
                            <div className="search-icon"><SearchIcon/></div>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Search city"
                                onChange = {changeHandler}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </form>
                <ul className="recent-searches">
                    {popularCities.map((e,i)=>popSearch(e,i))}
                </ul>

            </div>
        </header>
    )
}