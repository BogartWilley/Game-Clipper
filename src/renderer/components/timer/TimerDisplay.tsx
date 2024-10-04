import React from 'react';
import { useTimer } from '../../contexts/TimerContext';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';

import './timer.css';

export default function TimerDisplay() {
  const { elapsedTime, formatTime, isRunning, setIsRunning } = useTimer();

  return (
    <div className="timer-container">
      <div className="timer-content">
        <PlayCircleFilledWhiteIcon className="timer-icon" />{' '}
        <div className="timer-text">{formatTime(elapsedTime)}</div>
      </div>
    </div>
  );
}
