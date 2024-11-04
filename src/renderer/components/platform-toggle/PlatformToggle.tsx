import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { motion } from 'framer-motion';
const youtubeLogo = require('./platform-images/youtube-logo.png');
const streamableLogo = require('./platform-images/stream-logo.png');
type PossiblePlatform = 'youtube' | 'streamable';

export default function PlatformToggle(props: any) {
  const [selectedPlatform, setSelectedPlatform] =
    useState<PossiblePlatform>('youtube');

  function handlePlatformToggle(platform: PossiblePlatform) {
    setSelectedPlatform(platform);
    window.electron.ipcRenderer.sendMessage('change-platform', platform);
  }

  return (
    <motion.div>
      <Box sx={{ display: 'flex', '& button': { m: 1 } }}>
        <motion.div
          whileHover={selectedPlatform === 'streamable' ? { scale: 1.07 } : {}}
          whileTap={selectedPlatform === 'streamable' ? { scale: 0.95 } : {}}
        >
          <Button
            size="medium"
            variant="contained"
            style={{
              backgroundColor:
                selectedPlatform === 'youtube' ? '#b91616' : '#b9161690',
            }}
            onClick={() => {
              handlePlatformToggle('youtube');
            }}
            disabled={selectedPlatform === 'youtube'}
            draggable="false"
          >
            <img
              width="120px"
              src={youtubeLogo}
              alt="YouTube Logo"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
              draggable="false"
            />
          </Button>
        </motion.div>

        <motion.div
          whileHover={selectedPlatform === 'youtube' ? { scale: 1.07 } : {}}
          whileTap={selectedPlatform === 'youtube' ? { scale: 0.95 } : {}}
        >
          <Button
            size="medium"
            variant="contained"
            style={{
              backgroundColor:
                selectedPlatform === 'streamable' ? '#3088b0' : '#3088b090',
            }}
            onClick={() => {
              handlePlatformToggle('streamable');
            }}
            disabled={selectedPlatform === 'streamable'}
            draggable="false"
          >
            <img
              width="120px"
              height="38px"
              src={streamableLogo}
              alt="Streamable Logo"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
              draggable="false"
            />
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
}
