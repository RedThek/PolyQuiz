import { useState, useRef, useEffect, useCallback } from 'react';

// useTimer fournit un compte à rebours précis et sûr sans fuite mémoire.
export const useTimer = (initialSeconds = 60) => {
  // État qui stocke le temps restant en secondes.
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  // Indique si le timer est actif ou arrêté.
  const [isActive, setIsActive] = useState(false);

  // Référence mutable pour stocker l'identifiant setInterval.
  // useRef est utilisé ici pour éviter des re-rendus inutiles.
  const intervalRef = useRef(null);

  useEffect(() => {
    // Si le timer n'est pas démarré, on ne fait rien.
    if (!isActive) return;

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((previous) => {
        if (previous <= 1) {
          // Lorsque le temps arrive à zéro, on arrête l'intervalle.
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsActive(false);
          return 0;
        }

        // Décrémente le temps restant d'une seconde.
        return previous - 1;
      });
    }, 1000);

    // Nettoyage du useEffect : cette fonction est appelée lors de la destruction
    // du composant ou avant le prochain effet si isActive change.
    return () => {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isActive]);

  const start = useCallback(() => {
    if (secondsLeft > 0) {
      setIsActive(true);
    }
  }, [secondsLeft]);

  const pause = useCallback(() => {
    setIsActive(false);
    window.clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(
    (value = initialSeconds) => {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
      setSecondsLeft(value);
      setIsActive(false);
    },
    [initialSeconds]
  );

  return { secondsLeft, isActive, start, pause, reset };
};
