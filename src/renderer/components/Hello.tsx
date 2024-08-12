import icon from '../../../assets/icon.svg';

export default function Hello() {
  const pyIpcHandle = () => {
    window.electron.ipcRenderer.sendMessage('run-python-script');
  };

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>

          <button
            style={{ marginTop: '20px' }}
            type="button"
            onClick={() => {
              pyIpcHandle();
            }}
          >
            Start Py Script
          </button>
        </a>
      </div>
    </div>
  );
}
