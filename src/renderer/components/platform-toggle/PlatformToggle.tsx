import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
const youtubeLogo = require('./platform-images/youtube-logo.png');
const streamableLogo = require('./platform-images/stream-logo.png');
type PossiblePlatform = 'youtube' | 'streamable';

export default function PlatformToggle(props: any) {
  const [selectedPlatform, setSelectedPlatform] =
    useState<PossiblePlatform>('youtube');

  function handlePlatformToggle(platform: PossiblePlatform) {
    setSelectedPlatform(platform);
  }

  return (
    <Box sx={{ display: 'flex', '& button': { m: 1 } }}>
      {' '}
      {/* Changed from div to Box */}
      <Button
        size="medium"
        variant="contained"
        style={{
          backgroundColor:
            selectedPlatform === 'youtube' ? '#9e0000' : '#9e000090',
          userSelect: 'none',
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
      <Button
        size="medium"
        variant="contained"
        style={{
          backgroundColor:
            selectedPlatform === 'streamable' ? '#0072a7' : '#0072a790',
          userSelect: 'none',
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
    </Box>
  );
}
