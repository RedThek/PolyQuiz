import { useState, useRef, useEffect, useCallback } from 'react';

export const useTimer = (initialSeconds = 0) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = window.setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => window.clearInterval(intervalRef.current);
  }, [isActive]);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback((value = 0) => {
    setSeconds(value);
    setIsActive(false);
  }, []);

  return { seconds, isActive, start, pause, reset };
};
