import './Bubble.css';
export default function BubbleContainer(props: any) {
  return (
    <div
      id="bubbleContainer"
      className="bubble-container"
      style={
        props.grayed
          ? {
              opacity: 0.5,
              filter: 'brigthness(70%)',
            }
          : {}
      }
    >
      {' '}
      {props.children}
    </div>
  );
}
