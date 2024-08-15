import backgroundImage from './background-images/maxresdefault.jpg';
import './background.css';

export default function Background(props: any) {
  return <div className="background-image">{props.children}</div>;
}
