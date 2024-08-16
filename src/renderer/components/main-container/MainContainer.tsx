import Background from '../background/Background';
import SideBar from '../sidebar/Drawer';
import Bubble from '../social-bubbles/Bubble';
import BubbleContainer from '../social-bubbles/BubbleContainer';

export default function MainContainer(props: any) {
  return (
    <div>
      <Background>
        <SideBar></SideBar>
        <BubbleContainer>
          {' '}
          <Bubble
            URL="https://www.youtube.com/@SalimOfShadow"
            imageSource={require('../social-bubbles/bubble-icons/youtube-icon.png')}
          ></Bubble>
        </BubbleContainer>
      </Background>
    </div>
  );
}
