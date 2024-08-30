'use client';
import { useEffect, useState } from 'react';
import styles from "../page.module.css";
import { useTimer } from '../hooks/timer.js'; 

const BanderaPage = () => {
  const [bandera, setBandera] = useState({
    name: null,
    flag: null,
    iso2: null,
    iso3: null,
  });
  const [listaPaises, setListaPaises] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [matchPais, setMatchPais] = useState(null);
  const [puntos, setPuntos] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const { time, isActive, start, reset, parar } = useTimer(15);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(user);
      const savedNames = JSON.parse(localStorage.getItem('names')) || [];
      const userData = savedNames.find(name => name.name === user);
      if (userData) {
        setPuntos(userData.points); 
      }
    } else {
      window.location.href = '/nameSelection';
    }
    fetchNewCountry();
  }, []);

  useEffect(() => {
    if (time === 0 && isActive) {
      handleTimeUp();
    }
  }, [time]);

  useEffect(() => {
    if (currentUser) {
      const savedNames = JSON.parse(localStorage.getItem('names')) || [];
      const userIndex = savedNames.findIndex(name => name.name === currentUser);
      if (userIndex !== -1) {
        savedNames[userIndex].points = puntos;
        localStorage.setItem('names', JSON.stringify(savedNames));
      }
    }
  }, [puntos]);

  const fetchNewCountry = async () => {
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
      const paises = await response.json();
      let pais = paises.data[Math.floor(Math.random() * paises.data.length)];
      
      while (listaPaises.some(b => b.iso2 === pais.iso2)) {
        pais = paises.data[Math.floor(Math.random() * paises.data.length)];
      }
      setBandera({
        name: pais.name,
        flag: pais.flag,
        iso2: pais.iso2,
        iso3: pais.iso3,
      });

      setListaPaises(prevList => [...prevList, pais]);
      setInputValue('');
      setMatchPais(null);
      setSubmitted(false);
      
      reset(15);
      start();
    } catch (error) {
      console.error('Error encontrando país:', error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!submitted) {
      if (inputValue.toLowerCase() === bandera.name.toLowerCase()) {
        setMatchPais(true);
        setPuntos(prevPuntos => prevPuntos + 10);
      } else {
        setMatchPais(false);
        setPuntos(prevPuntos => Math.max(prevPuntos - 1, 0));
      }
      setSubmitted(true);
    }
    parar();
  };

  const handleTimeUp = () => {
    if (!submitted) {
      setPuntos(prevPuntos => Math.max(prevPuntos - 1, 0));
      setMatchPais(false);
      setSubmitted(true);
    }
    fetchNewCountry(); 
  };

  const siguienteBandera = () => {
    fetchNewCountry();
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Bandera</h1>
        {bandera.flag ? (
          <div>
            <img src={bandera.flag} alt={`Bandera de ${bandera.name}`} style={{ width: '100px', height: 'auto' }} />
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Escribe el nombre del país"
              disabled={submitted}
            />
            <button onClick={handleSubmit} disabled={submitted}>Verificar</button>
            {matchPais === true && <p style={{ color: 'green' }}>¡Correcto!</p>}
            {matchPais === false && <p style={{ color: 'red' }}>Incorrecto</p>}
            {matchPais !== null && <button onClick={siguienteBandera}>Siguiente Bandera</button>}
            <p>Tiempo restante: {time} segundos</p>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
        <p>Puntaje: {puntos}</p>
      </div>
    </main>
  );
};

export default BanderaPage;
