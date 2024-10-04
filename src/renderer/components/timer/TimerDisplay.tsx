import React from 'react';
import { useTimer } from '../../contexts/TimerContext';

export default function TimerDisplay() {
  const { elapsedTime, formatTime, isRunning, setIsRunning } = useTimer();

  return (
    <div>
      <div style={{ width: '400px' }}>
        Elapsed Time = {formatTime(elapsedTime)}
      </div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop the timer' : 'Start the timer'}
      </button>
    </div>
  );
}
