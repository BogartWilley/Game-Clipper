import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@mui/material';
import { AlertStatusType, AlertUser } from '../alert/AlertUser';
import Background from '../background/Background';
import SideBar from '../sidebar/Sidebar';
import Bubble from '../social-bubbles/Bubble';
import BubbleContainer from '../social-bubbles/BubbleContainer';
import { useGameContext } from '../../contexts/GameContext';
import SettingsContainer from '../settings-container/SettingsContainer';
import './main-container.css';

export default function MainContainer(props: any) {
  const [processRunning, setProcessRunning] = useState(false);
  const [buttonsGrayed, setButtonGrayed] = useState(false);
  const [keyCount, setKeyCount] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState<AlertStatusType | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const { currentGame } = useGameContext();
  const parsedCurrentGame = `${currentGame.replace(/_/g, '')}-Background.png`;
  const [closeAlert, setCloseAlert] = useState<boolean>(false);

  // Function to toggle settings page visibility
  interface MessageObject {
    connected: boolean;
    status: string;
    message: string;
  }

  window.electron.ipcRenderer.on('display-alert', (message) => {
    console.log('I will now display the alert object : ');
    console.log(message);
  });

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
  };

  useEffect(() => {
    if (alertStatus && !closeAlert) {
      const timer = setTimeout(() => {
        setCloseAlert(true);
      }, 2600);

      return () => clearTimeout(timer);
    }
  }, [alertStatus, closeAlert, alertMessage]);

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
        {/* All social bubbles */}
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
        <center style={{ marginTop: '250px' }}>
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
        </center>
      )}

      {/* Render alert if status is set and alert is not closed */}
      {alertStatus && !closeAlert && (
        <AlertUser
          status={alertStatus}
          message={alertMessage}
          setCloseAlert={setCloseAlert}
        />
      )}
    </div>
  );
}
