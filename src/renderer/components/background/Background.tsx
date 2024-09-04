import backgroundImage from './background-images/maxresdefault.jpg';
import './background.css';

export default function Background(props: any) {
  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${props.picture})` }}
    >
      {props.children}
    </div>
  );
}
