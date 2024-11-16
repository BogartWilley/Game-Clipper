import './Bubble.css';
import errorIcon from './bubble-icons/error-icon.png';
import { useErrorContext } from '../../contexts/ErrorContext';
export default function BubbleContainer(props: any) {
  const { errorPresent } = useErrorContext();
  return (
    <div
      id="bubbleContainer"
      className="bubble-container"
      style={
        props.grayed
          ? {
              opacity: 0.5,
              filter: 'brightness(70%)',
            }
          : {}
      }
    >
      {props.children}
      {errorPresent && (
        <div className="error-icon">
          <img
            width="22px"
            src={errorIcon}
            style={{
              filter: 'drop-shadow(0px 0px 7px rgba(255, 0, 0, 1))',
            }}
          />
        </div>
      )}
    </div>
  );
}
