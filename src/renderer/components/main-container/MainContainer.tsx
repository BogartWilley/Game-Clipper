import { ipcMain } from 'electron';
import Background from '../background/Background';
import SideBar from '../sidebar/Sidebar';
import Bubble from '../social-bubbles/Bubble';
import BubbleContainer from '../social-bubbles/BubbleContainer';
import { changeGame } from '../../utils/changeGame';

export default function MainContainer(props: any) {
  return (
    <div>
      <Background>
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
        </BubbleContainer>
        <center style={{ marginTop: '250px' }}>
          <button
            style={{ width: '140px', height: '60px' }}
            onClick={() => {
              window.electron.ipcRenderer.sendMessage('send-env', [
                'possible arguments',
              ]);
            }}
          >
            Log Game Variable
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
