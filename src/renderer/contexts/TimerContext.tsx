import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const TimerContext = createContext<any>(null);

// Provider component
export const TimerProvider = ({ children }: any) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Helper function to format time as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // IPC listener from main process to start timer
  useEffect(() => {
    window.electron.ipcRenderer.on('start-timer', () => {
      setIsRunning(true);
    });
    window.electron.ipcRenderer.on('stop-timer', () => {
      setIsRunning(false);
    });
  }, []);

  return (
    <TimerContext.Provider
      value={{ elapsedTime, formatTime, isRunning, setIsRunning }}
    >
      {children}
    </TimerContext.Provider>
  );
};

// Custom hook to use the TimerContext
export const useTimer = () => useContext(TimerContext);
