import React from 'react';
import { useTimer } from '../../contexts/TimerContext';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';

import './timer.css';
import { color } from 'framer-motion';
import PlatformToggle from '../platform-toggle/PlatformToggle';

export default function TimerDisplay() {
  const { elapsedTime, formatTime, isRunning, setIsRunning } = useTimer();

  return (
    <div className="timer-container">
      <div className="timer-content">
        {isRunning ? (
          <StopCircleIcon
            sx={{ width: '35px', height: '35px' }}
            className="timer-icon-stop"
          />
        ) : (
          <PlayCircleFilledWhiteIcon
            sx={{ width: '35px', height: '35px' }}
            className="timer-icon-play"
          />
        )}

        <div className="timer-text">{formatTime(elapsedTime)}</div>
      </div>
    </div>
  );
}
