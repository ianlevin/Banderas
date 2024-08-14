'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css'; 

const NameSelectionPage = () => {
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const savedNames = JSON.parse(localStorage.getItem('names')) || [];
    setNames(savedNames);
  }, []);

  const handleAddName = () => {
    if (newName.trim() && !names.some(name => name.name === newName.trim())) {
      const updatedNames = [...names, { name: newName.trim(), points: 0 }];
      setNames(updatedNames);
      localStorage.setItem('names', JSON.stringify(updatedNames));
      setNewName('');
    }
  };

  const handleStartGame = () => {
    if (selectedName) {
      localStorage.setItem('currentUser', selectedName);
      router.push('/banderas');
    }
  };

  return (
    <main className={styles.main}>
      <h1>Selecciona o Ingresa tu Nombre</h1>
      <div>
        <select value={selectedName} onChange={e => setSelectedName(e.target.value)}>
          <option value="">Selecciona un nombre</option>
          {names.map(name => (
            <option key={name.name} value={name.name}>
              {name.name}
            </option>
          ))}
        </select>
        <button onClick={handleStartGame} disabled={!selectedName}>Jugar</button>
      </div>
      <div>
        <input
          type="text"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="Ingresa un nuevo nombre"
        />
        <button onClick={handleAddName}>Agregar Nombre</button>
      </div>
    </main>
  );
};

export default NameSelectionPage;
