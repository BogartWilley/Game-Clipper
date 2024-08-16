import './Bubble.css';
export default function Bubble(props: any) {
  const redirectURL = props.URL;
  const image = props.imageSource;

  return (
    <div>
      <img
        className="bubble"
        id="bubble"
        src={image}
        onClick={() => {
          window.open(props.URL);
        }}
      ></img>
    </div>
  );
}
