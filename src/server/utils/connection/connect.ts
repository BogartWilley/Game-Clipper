import { MessageObject } from '../../../renderer/utils/displayAlert';

import { default as OBSWebSocket } from 'obs-websocket-js';
export const obs = new OBSWebSocket();

export async function connectWs(): Promise<MessageObject> {
  const PORT = process.env.WS_PORT;
  const PASSWORD = process.env.WS_PASSWORD;

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
    return { connected: true, status: 'success', message: '' };
  } catch (error: any) {
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
                       Ensure OBS is running and both the port (${port}) and your choosen password match their corrispondent settings inside OBS.`;
      console.log(error);
      return {
        connected: false,
        status: 'error',
        message,
      };
    }
    return { connected: false, status: '', message: '' };
  }
}
