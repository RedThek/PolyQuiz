import { useState, useRef, useEffect, useCallback } from 'react';

export const useTimer = (initialSeconds = 60) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((previous) => {
        if (previous <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsActive(false);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

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

  const reset = useCallback((value = initialSeconds) => {
    window.clearInterval(intervalRef.current);
    intervalRef.current = null;
    setSecondsLeft(value);
    setIsActive(false);
  }, [initialSeconds]);

  return { secondsLeft, isActive, start, pause, reset };
};
