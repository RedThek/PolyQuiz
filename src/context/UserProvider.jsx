import { useState } from 'react';
import { UserContext } from './UserContext.jsx';

// UserProvider enveloppe toute l'application dans src/main.jsx.
// Il stocke les valeurs globales de l'utilisateur et les rend
// accessibles aux composants enfants via UserContext.
export const UserProvider = ({ children }) => {
  // Pseudo saisi par l'utilisateur depuis la page d'accueil.
  const [pseudo, setPseudo] = useState(null);

  // Meilleur score atteint depuis le lancement de l'application.
  const [bestScore, setBestScore] = useState(0);

  // Score du dernier quiz terminé.
  const [lastScore, setLastScore] = useState(0);

  // Durée totale du dernier quiz en secondes.
  const [lastDuration, setLastDuration] = useState(0);

  // Nombre de questions utilisées pour le dernier quiz.
  const [lastQuestionCount, setLastQuestionCount] = useState(0);

  return (
    <UserContext.Provider value={{
      pseudo,
      setPseudo,
      bestScore,
      setBestScore,
      lastScore,
      setLastScore,
      lastDuration,
      setLastDuration,
      lastQuestionCount,
      setLastQuestionCount
    }}>
      {children}
    </UserContext.Provider>
  );
};
