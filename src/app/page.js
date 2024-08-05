'use client'

import { useEffect, useState } from 'react';
import styles from "./page.module.css";

const BanderaPage = () => {
  const [bandera, setBandera] = useState({
    name: null,
    flag: null,
    iso2: null,
    iso3: null,
  });
  const [listaPaises, setlistaPaises] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [matchPais, setmatchPais] = useState(null); 
  const [puntos, setPuntos] = useState(0); 
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchNewCountry();
  }, []);

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

      setlistaPaises(prevList => [...prevList, pais]);

      setInputValue('');
      setmatchPais(null);
      setSubmitted(false);
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
        setmatchPais(true);
        setPuntos(prevPuntos => prevPuntos + 10); 
      } else {
        setmatchPais(false);
        setPuntos(prevPuntos => Math.max(prevPuntos - 1, 0)); 
      }
      setSubmitted(true);
    }
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
            <img src={bandera.flag} alt={`Flag of ${bandera.name}`} style={{ width: '100px', height: 'auto' }} />
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
