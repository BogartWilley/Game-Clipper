export interface MessageObject {
  connected: boolean;
  status: string;
  message: string;
}

window.electron.ipcRenderer.on('display-alert', (message) => {
  console.log('I will now display the alert object : ');
  console.log(message);
});
