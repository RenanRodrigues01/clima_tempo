import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
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
  } else if (weather == false) {
    return (
      <div>
        Carregando...
      </div>
    );
  }
  else {
    return (
      <div className='container'>
        <header className='cabecalho'>
          <h1 className='title'>Clima em {weather['name']} ({weather['weather'][0]['description']}) </h1>
          <hr />
        </header>
        <main>
        <ul className='lista'>
            <li className='lista-item'>Temperatura Atual: {weather['main']['temp']}°</li>
            <li className='lista-item'>Temperatura maxima: {weather['main']['temp_max']}°</li>
            <li className='lista-item'>Temperatura minima: {weather['main']['temp_min']}°</li>
            <li className='lista-item'>Seansação térmica: {weather['main']['feels_like']}°</li>
            <li className='lista-item'>Pressão: {weather['main']['pressure']}hpa</li>
            <li className='lista-item'>Umidade: {weather['main']['humidity']}%</li>
          </ul>
        </main>
      </div>
    );
  }

}

export default App;
