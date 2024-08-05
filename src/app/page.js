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
const [listaBanderas, setListaBanderas] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
        const paises = await response.json();
        let pais = paises.data[Math.floor(Math.random() * 200)];
        while(listaBanderas.includes(pais)){
          pais = paises.data[Math.floor(Math.random() * 200)];
        }
        setBandera({
          name: pais.name,
          flag: pais.flag,
          iso2: pais.iso2,
          iso3: pais.iso3,
        });
      } catch (error) {
        console.error('Error encontrando pais:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Bandera</h1>
        {bandera.flag ? (
          <div>
            <img src={bandera.flag} alt={`Flag of ${bandera.name}`} style={{ width: '100px', height: 'auto' }} />
            <input type="text"/>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
};

export default BanderaPage;
