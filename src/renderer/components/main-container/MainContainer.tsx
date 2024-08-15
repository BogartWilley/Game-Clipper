import Background from '../background/Background';
import SideBar from '../sidebar/Drawer';

export default function MainContainer(props: any) {
  return (
    <div>
      <Background>
        <SideBar></SideBar>
      </Background>
    </div>
  );
}
