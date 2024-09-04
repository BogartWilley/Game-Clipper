import { ipcRenderer } from 'electron';
import Background from '../background/Background';
import SideBar from '../sidebar/Sidebar';
import Bubble from '../social-bubbles/Bubble';
import BubbleContainer from '../social-bubbles/BubbleContainer';
import { changeGame } from '../../utils/changeGame';
import { useState, useEffect } from 'react';
import { motion, transform } from 'framer-motion';
import KOF_XIII_IMAGE from '../background/background-images/KOFXIII-Background.png';
import USF4 from '../background/background-images/USF4-Background.jpg';

declare global {
  interface Window {
    EnvVariables: {
      products: () => Promise<any>;
    };
  }
}

export default function MainContainer(props: any) {
  const [processRunning, setProcessRunning] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [currentGame, setCurrentGame] = useState<string>('');
  const getEnvVariables = () => {
    window.EnvVariables.products().then((result) => {
      const parsedString = `${result.replace(/\s+/g, '')}-Background.png`;
      console.log('PARSED STRING' + parsedString);
      setCurrentGame('result');
      setBackgroundImage(parsedString);
    });
  };
  return (
    <div>
      <Background
        picture={require(`../background/background-images/${backgroundImage}`)}
      >
        <SideBar style={{ backgroundColor: 'red' }}></SideBar>
        <BubbleContainer>
          {' '}
          <Bubble
            URL="https://obsproject.com/download"
            imageSource={require('../social-bubbles/bubble-icons/obs-icon.png')}
          ></Bubble>
          <Bubble
            URL="https://www.youtube.com/@SalimOfShadow"
            imageSource={require('../social-bubbles/bubble-icons/youtube-icon.png')}
          ></Bubble>
          <Bubble
            URL="https://discord.gg/9KapPHD6jc"
            imageSource={require('../social-bubbles/bubble-icons/discord-icon.png')}
          ></Bubble>
          <Bubble
            URL="https://steamcommunity.com/id/salimofshadow/"
            imageSource={require('../social-bubbles/bubble-icons/steam-icon.png')}
          ></Bubble>
          <Bubble
            URL="https://github.com/SalimOfShadow"
            imageSource={require('../social-bubbles/bubble-icons/github-icon.png')}
          ></Bubble>
          <motion.div
            initial={{ x: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ rotate: 180 }}
            style={{ width: 50, height: 50 }}
          >
            <Bubble
              className="setting-button"
              imageSource={require('../social-bubbles/bubble-icons/setting-icon.png')}
            ></Bubble>
          </motion.div>
        </BubbleContainer>
        <center style={{ marginTop: '250px' }}>
          <button
            style={{ width: '140px', height: '60px' }}
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
          </button>
          <button
            style={{ width: '140px', height: '60px' }}
            onClick={() => {
              getEnvVariables();
            }}
          >
            Change Game Variable
          </button>
          {/* TODO : CHANGE THE BACKGROUND EACH TIME A GAME IT'S CHANGED */}
        </center>
      </Background>
    </div>
  );
}
