import React, { useState } from 'react';
import { useTimer } from '../../contexts/TimerContext';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';

import './timer.css';
import { color } from 'framer-motion';
import PlatformToggle from '../platform-toggle/PlatformToggle';

export default function TimerDisplay() {
  const { elapsedTime, formatTime, isRunning, setIsRunning } = useTimer();
  const [processRunning, setProcessRunning] = useState<boolean>(false);
  return (
    <div className="timer-container">
      <div className="timer-content">
        {isRunning ? (
          <StopCircleIcon
            sx={{ width: '35px', height: '35px', cursor: 'pointer' }}
            className="timer-icon-stop"
          />
        ) : (
          <div
            onClick={() => {
              if (processRunning) {
                const userConfirmed = window.confirm(
                  'The process is already running. Do you want to start it again?',
                );
                if (!userConfirmed) return;
              }
              window.electron.ipcRenderer.sendMessage('run-python-script', []);
              setProcessRunning(true);
            }}
          >
            <PlayCircleFilledWhiteIcon
              sx={{ width: '35px', height: '35px', cursor: 'pointer' }}
              className="timer-icon-play"
            />
          </div>
        )}

        <div className="timer-text">{formatTime(elapsedTime)}</div>
      </div>
    </div>
  );
}
