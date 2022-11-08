import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long)=>{
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params:{
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, []);

  if (location == false) {
    return (
      alert('a localização precisa estar ativa no browser para continuar')
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Clima nas suas Coordenadas </h1>
          <hr />
          <ul>
            <li>Temperatura Atual: </li>
            <li>Temperatura maxima: </li>
            <li>Temperatura minima: </li>
            <li>Pressão:  </li>
            <li>Umidade: </li>
          </ul>
        </header>
      </div>
    );
  }

}

export default App;
