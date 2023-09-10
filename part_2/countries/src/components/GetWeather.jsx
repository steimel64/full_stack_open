import React, { useState, useEffect } from "react";
import axios from "axios";

const GetWeather = ({ capital }) => {
    const [weather, setWeather] = useState();

    useEffect(() => {
        axios
            .get(
                `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_WEATHER_API}`
            )
            .then((res) => {
                setWeather(res.data);
            });
    }, []);

    const convertFromKelvinToCelsius = (temp) => {
        return Number(temp - 273.15).toFixed(2);
    };


    return (
        <>
            {weather && (
                <div>
                    <h3>Weather</h3>
                    <div>
                        Temperature:{" "} {convertFromKelvinToCelsius(weather.main.temp)} celsius
                    </div>
                    <div>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} width='10%' />
                    </div>
                    <div>
                        Wind (speed): {weather.wind.speed} m/sec
                    </div>
                </div>
            )}
        </>
    );
};
export default GetWeather