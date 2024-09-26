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
    const port = error.message.substr(error.message.length - 4);
    if (error.code === 4009) {
      console.error(
        "Invalid credentials! Make sure your password matches the one in OBS's settings.",
      );
    }
    if (error.code === -1) {
      console.error(
        `Invalid URL! Make sure OBS has successfully started and your selected port (${port}) matches the one in OBS's settings.`,
      );
    }
    return false;
  }
};

module.exports = { connectWs, obs };
