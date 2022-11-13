import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);
  const [city, setCity] = useState('');
  const [weatherForecast, setWeatherForecast] = useState(false)

  const handleChange = (event) => {
    setCity(event.target.value)
  }

  let handleSearch = async () => {
    let res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=3013423d5103479cb67235302220611&q=${city}&lang=pt`);
    setWeatherForecast(res.data);
  }

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

  if (location === false) {
    return (
      <div>
        Para usar a aplicação é preiso estar ativo a localização do browser.
      </div>
    );
  } else if (weather === false) {
    return (
      <div>
        Carregando...
      </div>
    );
  } else {
    return (
      <div className='container'>
        <header className='cabecalho'>
          <h1 className='title'>Previsão do tempo </h1>
        </header>
        <main className='principal'>
          <article className='openWeather'>
            <h2 className='title-openWeather'>Condições em {weather['name']} : {weather['weather'][0]['description']} </h2>
            <ul className='list'>
              <li className='list-item'>Temperatura Atual: {weather['main']['temp']}°</li>
              <li className='list-item'>Temperatura maxima: {weather['main']['temp_max']}°</li>
              <li className='list-item'>Temperatura minima: {weather['main']['temp_min']}°</li>
              <li className='list-item'>Seansação térmica: {weather['main']['feels_like']}°</li>
              <li className='list-item'>Pressão: {weather['main']['pressure']} hpa</li>
              <li className='list-item'>Umidade: {weather['main']['humidity']} %</li>
            </ul>
          </article>
          <article className='weatherForecast'>
            <h2 className='title-weatherForecast'>Verifique a previsão do tempo em outras cidades</h2>
            <p className='text'>Digite o nome da cidade no campo abaixo e em seguida clique em pesquisar</p>
            <div>
              <input className='handleChange'
                onChange={handleChange}
                value={city} />
            </div>
            <button className='button' onClick={handleSearch}>
              Pesquisar
            </button>
            {weatherForecast ? (
              <div>
                <div className='iconInformation'>
                  <img src={weatherForecast.current.condition.icon} alt='weather forecast image'/>
                  <h3 className='title-user'>Hoje o dia em {weatherForecast.location.name}, está: {weatherForecast.current.condition.text}</h3>
                </div>
                <ul className='list-user'>
                  <li className='list-user-item'>Temperatura Atual: {weatherForecast.current.temp_c}°</li>
                  <li className='list-user-item'>Seansação térmica: {weatherForecast.current.feelslike_c}°</li>
                  <li className='list-user-item'>Ventos: {weatherForecast.current.wind_kph}kph</li>
                  <li className='list-user-item'>Umidade: {weatherForecast.current.humidity}%</li>
                  <li className='list-user-item'>Presão: {weatherForecast.current.pressure_mb} hpa</li>
                </ul>
              </div>
            ) : null}
          </article>
        </main>
      </div>
    );
  }
}

export default App;
