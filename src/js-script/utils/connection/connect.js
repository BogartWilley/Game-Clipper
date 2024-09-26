const { default: OBSWebSocket } = require('obs-websocket-js');
const obs = new OBSWebSocket();

const connectWs = async () => {
  // TODO - Use these in prod
  // const PORT = process.env.WS_PORT;
  // const PASSWORD = process.env.WS_PASSWORD;

  const PORT = 4455;
  const PASSWORD = 'super-sekret';

  try {
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
    // TODO - NOTIFY THE FRONTEND
    return true; // Connection successful
  } catch (error) {
    console.error('Failed to connect', error.code, error.message);
    return false; // Connection failed
  }
};

module.exports = { connectWs, obs };
