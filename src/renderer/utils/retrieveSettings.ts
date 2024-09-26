import electron from 'electron';

export async function retrieveConfigs(): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      // Send the message to retrieve the config file
      window.electron.ipcRenderer.sendMessage('retrieve-config-file');

      // Listen for the response
      window.electron.ipcRenderer.on(
        'retrieve-config-file-reply',
        (settings: any) => {
          const configData = settings[0];
          resolve(configData); // Resolve the promise with configData
        },
      );
    } catch (err) {
      console.log('Encountered an error while fetching the config file');
      console.log(err);
      reject(err); // Reject the promise if there's an error
    }
  });
}
