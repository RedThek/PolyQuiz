import { useState } from 'react';
import { UserContext } from './UserContext.jsx';

export const UserProvider = ({ children }) => {
  const [pseudo, setPseudo] = useState(null);
  const [bestScore, setBestScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [lastDuration, setLastDuration] = useState(0);
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
