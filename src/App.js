import React, { useState } from "react";
import axios from "axios";


export default function App(props) {
  let [city, setCity] = useState("");
  let [display, setDisplay] = useState("");
  let [temperature, setTemperature] = useState(null);

  function showTemperature(response) {
    setDisplay(true);
    setTemperature({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=535cacbb3f8a0df0aeb4790235b9541f&units=metric`;
    axios.get(url).then(showTemperature);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let weather = (
    <form onSubmit={handleSubmit}>
      <input type="search" onChange={updateCity}/>
      <input type="submit" value="search" />
    </form>
  );

  if (display) {
    return (
      <div>
        {weather}
        <ul>
          <li>Temperature:{temperature.temperature}°C</li>
          <li>Description:{temperature.description}</li>
          <li>Humidity:{temperature.humidity}%</li>
          <li>Wind: {temperature.wind}km/h</li>
          <li>
            <img src={temperature.icon} alt="weather icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return weather;
  }
}




