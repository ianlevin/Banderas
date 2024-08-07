import { useState, useEffect } from 'react';

export const useTimer = (tiempoInicial = 15) => {
  const [time, setTime] = useState(tiempoInicial);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;

    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false); 
    }

    return () => clearInterval(timer); 
  }, [isActive, time]);

  const start = () => setIsActive(true);
  const reset = (newTime) => {
    setTime(newTime);
    setIsActive(false);
  };
  const parar = () => setIsActive(false)
  

  return { time, isActive, start, reset, parar};
};