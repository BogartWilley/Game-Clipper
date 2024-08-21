import Background from '../background/Background';
import SideBar from '../sidebar/Sidebar';
import Bubble from '../social-bubbles/Bubble';
import BubbleContainer from '../social-bubbles/BubbleContainer';

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
      </Background>
    </div>
  );
}
