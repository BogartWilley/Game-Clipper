import './Bubble.css';

export default function Bubble(props: any) {
  const image = props.imageSource;
  return (
    <div>
      <img
        className={`bubble ${props.className}`}
        id="bubble"
        src={image}
        onClick={() => {
          if (props.URL && !props.grayed) window.open(props.URL);
        }}
        style={
          props.grayed
            ? {
                userSelect: 'none',
                pointerEvents: 'none',
              }
            : {}
        }
      ></img>
    </div>
  );
}
