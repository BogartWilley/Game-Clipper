import { ipcRenderer } from 'electron';
import Background from '../background/Background';
import SideBar from '../sidebar/Sidebar';
import Bubble from '../social-bubbles/Bubble';
import BubbleContainer from '../social-bubbles/BubbleContainer';
import { changeGame } from '../../utils/changeGame';
import { useState, useEffect } from 'react';
import { motion, transform } from 'framer-motion';
import KOF_XIII_IMAGE from '../background/background-images/d77fb981df1478f7f95ba53da20bbfc865f6cc23.jpg';
import KOF_XIII_IMAGE2 from '../background/background-images/maxresdefault.jpg';

export default function MainContainer(props: any) {
  const [processRunning, setProcessRunning] = useState(false);
  const [backgroundImage, setBackgroundImage] =
    useState<string>(KOF_XIII_IMAGE);
  // useEffect(() => {
  //   ipcRenderer.on('change-background', () => {
  //     setBackgroundImage(KOF_XIII_IMAGE2);
  //   });
  // }, []);
  return (
    <div>
      <Background picture={backgroundImage}>
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
              changeGame('KOF XIII');
            }}
            // TODO - CREATE A BUTTON TO START THE PYTHON SCRIPT AND CHANGE ENV VARIABLES
          >
            Change Game Variable
          </button>
        </center>
      </Background>
    </div>
  );
}
