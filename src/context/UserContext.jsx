import React, { createContext, useState } from 'react';

// 1. Instanciation du contexte global pour stocker les données utilisateur (pseudo et meilleur score)
export const UserContext = createContext();

// 2. Création du composant Provider qui enveloppe l'application et fournit les données globales
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