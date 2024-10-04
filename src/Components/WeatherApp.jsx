import sunny from '../assets/Images/sunny.png'
import cloudy from '../assets/Images/cloudy.png'
import rainy from '../assets/Images/rainy.png'
import snowy from '../assets/Images/snowy.png'
import { useState,useEffect } from 'react'



const WeatherApp = () => {
    const api_key = 'd1c8c98c8b3a42e5ac9160428232907'
    const [data, setData] = useState([])
    const [location, setLocation] = useState('')
    const handeInputChange = (e) => {
        setLocation(e.target.value)

    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search()
        }
    }
    useEffect(()=>{
        const fetchDefaultLocation = async()=>{
            const defaultLocation='India'
            const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${defaultLocation}&aqi=no`;
            const res = await fetch(url);
            const defaultData = await res.json()
            setData(defaultData)
        }

        fetchDefaultLocation()
    },[])

    const search = async () => {
        if (location.trim() !== '') {
            const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}&aqi=no`;
            const res = await fetch(url);
            const searchdata = await res.json()
            console.log(searchdata)
            setData(searchdata)
            setLocation('')
            
        }
        
    }
    const weatherimages = {
            "Sunny": sunny,
            "Rainy": rainy,
            "Clear": sunny,
            "Cloudy": cloudy,
            "cloudy": cloudy,
            "Mist": cloudy,
            "snowy":snowy,
            "Partly cloudy": cloudy,
            "Partly Cloudy": cloudy,
            "Overcast": cloudy,
            "Patchy rain possible": rainy,
            "Patchy snow possible": snowy,
            "Patchy sleet possible": snowy,
            "Patchy freezing drizzle possible": snowy,
            "Thundery outbreaks possible": rainy,
            "Blowing snow": snowy,
            "Blizzard": snowy,
            "Fog": cloudy,
            "Freezing fog": snowy,
            "Patchy light drizzle": rainy,
            "Light drizzle": rainy,
            "Freezing drizzle": snowy,
            "Heavy freezing drizzle": snowy,
            "Patchy light rain": rainy,
            "Light rain": rainy,
            "Moderate rain at times": rainy,
            "Moderate rain": rainy,
            "Heavy rain at times": rainy,
            "Heavy rain": rainy,
            "Light freezing rain": rainy,
            "Moderate or heavy freezing rain": rainy,
            "Light sleet": snowy,
            "Moderate or heavy sleet": snowy,
            "Patchy light snow": snowy,
            "Light snow": snowy,
            "Patchy moderate snow": snowy,
            "Moderate snow": snowy,
            "Patchy heavy snow": snowy,
            "Heavy snow": snowy,
            "Ice pellets": snowy,
            "Light rain shower": rainy,
            "Moderate or heavy rain shower": rainy,
            "Torrential rain shower": rainy,
            "Light sleet showers": rainy,
            "Moderate or heavy sleet showers": snowy,
            "Light snow showers": snowy,
            "Moderate or heavy snow showers": snowy,
            "Light showers of ice pellets": snowy,
            "Moderate or heavy showers of ice pellets": snowy,
            "Patchy light rain with thunder": rainy,
            "Moderate or heavy rain with thunder": rainy,
            "Patchy light snow with thunder": snowy,
            "Moderate or heavy snow with thunder": snowy
    }
    const weatherimage = data.current
    ? weatherimages[data.current.condition.text]
    : null;

    // console.log(weatherimage.slice())
   
    

    return (
        <div className="container">
            <div className="weather-app">
                <div className="search">
                    <div className="search-top">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="location">{data.location ? data.location.name : null}</div>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Enter Location" value={location} onChange={handeInputChange} onKeyDown={handleKeyDown} ></input>
                        <i className="fa-solid fa-magnifying-glass" onClick={search} ></i>
                    </div>
                </div>
                <div className="weather">
                    <img src={weatherimage} alt='sunnt'></img>
                    <div className="weather-type">{data.current ? data.current.condition.text : null}</div>
                    <div className="temp">{data.current ? `${Math.floor(data.current.temp_c)}°C` : null} </div>
                </div>
                <div className="weather-date">
                    <p>Fri, 3 May</p>
                </div>
                <div className="weather-data">
                    <div className="humidity">
                        <div className="data-name">Humidity</div>
                        <i className="fa-solid fa-droplet"></i>
                        <div className="data">{data.current ? data.current.humidity : null}%</div>
                    </div>
                    <div className="wind">
                        <div className="data-name">Wind</div>
                        <i className="fa-solid fa-wind"></i>
                        <div className="data">{data.current ? data.current.wind_kph : null} km/h</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp