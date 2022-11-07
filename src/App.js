import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

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
