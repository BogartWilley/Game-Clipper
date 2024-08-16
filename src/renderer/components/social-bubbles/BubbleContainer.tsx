import './Bubble.css';
export default function BubbleContainer(props: any) {
  return (
    <div id="bubbleContainer" className="bubble-container">
      {' '}
      {props.children}
    </div>
  );
}
