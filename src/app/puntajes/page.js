'use client'
import { useEffect, useState } from 'react';

const Puntaje = () => {
  const [jugadores, setJugdores] = useState([]);

  useEffect(() => {
    const nombres = JSON.parse(localStorage.getItem('names')) || [];
    const jugadoresSorted = nombres.sort((a, b) => b.points - a.points);
    setJugdores(jugadoresSorted);
  }, []);

  return (
    <div>
      <h1>Ranking de Jugadores</h1>
      <ul>
        {jugadores.map(player => (
          <li key={player.name}>{player.name}: {player.points} puntos</li>
        ))}
      </ul>
    </div>
  );
}

export default Puntaje;
