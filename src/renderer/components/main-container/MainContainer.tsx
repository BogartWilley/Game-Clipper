import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Icon imports :
import { Button } from '@mui/material';

// Components imports :
import Background from '../background/Background';
import SideBar from '../sidebar/Sidebar';
import BubbleContainer from '../social-bubbles/BubbleContainer';
import Bubble from '../social-bubbles/Bubble';
import { AlertStatusType, AlertUser } from '../alert/AlertUser';
import SettingsContainer from '../settings-container/SettingsContainer';

// Context imports :
import { useGameContext } from '../../contexts/GameContext';
import { useErrorContext } from '../../contexts/ErrorContext';

// Styles imports :
import './main-container.css';
import TimerDisplay from '../timer/TimerDisplay';

export default function MainContainer(props: any) {
  // States
  const [processRunning, setProcessRunning] = useState<boolean>(false);
  const [buttonsGrayed, setButtonGrayed] = useState<boolean>(false);
  const [keyCount, setKeyCount] = useState<number>(0);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [alertStatus, setAlertStatus] = useState<AlertStatusType | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [closeAlert, setCloseAlert] = useState<boolean>(false);
  const [alertTimer, setAlertTimer] = useState<number>(2000);
  const [initialAlert, setInitialAlert] = useState<boolean>(false);
  // Contexts
  const { currentGame } = useGameContext();
  const { errorPresent, setErrorPresent } = useErrorContext();

  // Effects

  useEffect(() => {
    const handleAlert = (message: any) => {
      console.log(`the status is : ${message.status}`);
      console.log(message);
      const successMessage =
        'Successfully connected to OBS! Please select a game and start recording your replays!';
      toggleAlert(message.status, message.message || successMessage);

      // TODO - ONLY SET THE ERROR PRESENT TO FALSE IF OBS IS CONNECTED,AND ALL THE FIELDS ARE VALID!
      if (!message.message) setErrorPresent(false);
    };

    window.electron.ipcRenderer.on('display-alert', handleAlert);
  }, [initialAlert]);

  useEffect(() => {
    if (alertStatus && !closeAlert) {
      const timer = setTimeout(() => {
        setCloseAlert(true);
      }, alertTimer + 600); // This control when the alert component unmount

      return () => clearTimeout(timer);
    }
  }, [alertStatus, closeAlert, alertMessage]);

  // Function to toggle settings page visibility
  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
    setKeyCount(keyCount + 1);
    setButtonGrayed(!buttonsGrayed);
  };

  // Function to trigger a new alert
  const toggleAlert = (status: AlertStatusType, message: string) => {
    setAlertStatus(status);
    setAlertMessage(message);
    setCloseAlert(false); // Reset the closeAlert flag whenever a new alert is triggered
    setInitialAlert(true);

    if (status === 'error') {
      setErrorPresent(true);
      setAlertTimer(9900000); // TODO - CHANGE THIS TO INFINITY
      return;
    }

    // Handle warning status
    if (status === 'warning') {
      setErrorPresent(true);
      return;
    }

    setAlertTimer(2000);
  };

  const parsedCurrentGame = `${currentGame.replace(/_/g, '')}-Background.png`;
  return (
    <div>
      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            key={keyCount}
            transition={{ duration: 0.2 }}
          >
            <SettingsContainer
              closeSettings={() => {
                if (settingsOpen) toggleSettings();
              }}
              toggleAlert={toggleAlert}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SideBar
        closeSettings={() => {
          if (settingsOpen) toggleSettings();
        }}
      />

      <Background
        picture={require(
          `../background/background-images/${parsedCurrentGame}`,
        )}
        style={{ backgroundColor: 'black' }}
      />

      <BubbleContainer grayed={buttonsGrayed}>
        <Bubble
          URL="https://obsproject.com/download"
          imageSource={require('../social-bubbles/bubble-icons/obs-icon.png')}
          grayed={buttonsGrayed}
        />
        <Bubble
          URL="https://www.youtube.com/@SalimOfShadow"
          imageSource={require('../social-bubbles/bubble-icons/youtube-icon.png')}
          grayed={buttonsGrayed}
        />
        <Bubble
          URL="https://discord.gg/9KapPHD6jc"
          imageSource={require('../social-bubbles/bubble-icons/discord-icon.png')}
          grayed={buttonsGrayed}
        />
        <Bubble
          URL="https://steamcommunity.com/id/salimofshadow/"
          imageSource={require('../social-bubbles/bubble-icons/steam-icon.png')}
          grayed={buttonsGrayed}
        />
        <Bubble
          URL="https://github.com/SalimOfShadow"
          imageSource={require('../social-bubbles/bubble-icons/github-icon.png')}
          grayed={buttonsGrayed}
        />

        {/* Settings button */}
        <motion.div
          initial={{ x: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ rotate: 180 }}
          style={{ width: 50, height: 50, cursor: 'pointer' }}
          onClick={toggleSettings} // Toggle settings on click
        >
          <Bubble
            className="setting-button"
            imageSource={require('../social-bubbles/bubble-icons/setting-icon.png')}
          />
        </motion.div>
      </BubbleContainer>
      {!settingsOpen && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2, width: 140, height: 60 }}
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
            Start Recording
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ width: 140, height: 60, fontSize: 'small' }}
            onClick={() => {
              window.electron.ipcRenderer.sendMessage(
                'select-download-directory',
                [],
              );
            }}
          >
            Change Replay Directory
          </Button>
          <TimerDisplay />
        </div>
      )}
      {/* Render alert if status is set and alert is not closed */}
      {alertStatus && !closeAlert && (
        <AlertUser
          status={alertStatus}
          message={alertMessage}
          setCloseAlert={setCloseAlert}
          alertTimer={alertTimer}
        />
      )}
    </div>
  );
}
