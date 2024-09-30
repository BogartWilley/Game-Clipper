const { default: OBSWebSocket } = require('obs-websocket-js');
const obs = new OBSWebSocket();

const connectWs = async () => {
  // TODO - Use these in prod
  /* 
  const PORT = 4455;
  const PASSWORD = 'super-sekret'; */

  try {
    const PORT = process.env.WS_PORT;
    const PASSWORD = process.env.WS_PASSWORD;
    const { obsWebSocketVersion, negotiatedRpcVersion } = await obs.connect(
      `ws://127.0.0.1:${PORT}`,
      `${PASSWORD}`,
      {
        rpcVersion: 1,
      },
    );
    console.log(
      `Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`,
    );
    return { connected: true, status: 'success' }; // Connection successful
    // TODO - NOTIFY THE FRONTEND
  } catch (error) {
    const port = error.message.substr(error.message.length - 4);
    if (error.code === 4009) {
      const message =
        "Invalid credentials! Make sure your password matches the one in OBS's settings.";
      console.error(message);
      return {
        connected: false,
        status: 'error',
        message,
      };
    }
    if (error.code === -1) {
      const message = `Failed to connect to OBS!　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
                       Ensure OBS is running and both the port (${port}) and your choosen password match their corrispondent settings inside Tools --> WebSocket Server Settings.`;
      console.log(error);
      return {
        connected: false,
        status: 'error',
        message,
      };
    }
    return false;
  }
};

module.exports = { connectWs, obs };
