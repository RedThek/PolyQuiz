import React, { createContext, useState } from 'react';

// 1. Instanciation du contexte global [cite: 25]
export const UserContext = createContext();

// 2. Création du composant Provider [cite: 25]
export const UserProvider = ({ children }) => {
  // L'état global contient le pseudo (null par défaut) et le meilleur score [cite: 26]
  const [pseudo, setPseudo] = useState(null);
  const [bestScore, setBestScore] = useState(0);

  return (
    <UserContext.Provider value={{ pseudo, setPseudo, bestScore, setBestScore }}>
      {children}
    </UserContext.Provider>
  );
};