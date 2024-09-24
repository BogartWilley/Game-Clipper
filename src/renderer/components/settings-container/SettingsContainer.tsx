import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  IconButton,
  Grid2,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from '@mui/material';

// Icon imports :
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Components imports :
import PasswordSetting from './settings/PasswordSetting';
import PortSetting from './settings/PortSetting';
import DirectorySetting from './settings/DirectorySetting';

// Styles imports :
import './setting-container.css';

// Context imports :
import { useSettings } from '../../contexts/SettingsContext';
import { validateSettings } from '../../utils/validateSettings';

// Create themes
// TODO : Make the theme a Context, so that the sidebar and other potential elements can inherit the state
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#424242', // Dark background color
      default: '#303030', // Darker default background
    },
    primary: {
      main: '#90caf9', // Light blue for primary buttons
    },
    text: {
      primary: '#ffffff', // White text
    },
  },
  typography: {
    h4: {
      fontWeight: 'bold',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      paper: '#ffffff', // Light background for paper components
      default: '#f5f5f5', // Light default background
    },
    primary: {
      main: '#1976d2', // Blue for primary buttons
    },
    text: {
      primary: '#000000', // Black text color
    },
  },
  typography: {
    h4: {
      fontWeight: 'bold',
    },
  },
});

const SettingsContainer = (props: any) => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const { settings, setSettings } = useSettings();
  const [wsPort, setWsPort] = useState<number>(settings.WS_PORT);
  const [wsPassword, setWsPassword] = useState<string>(settings.WS_PASSWORD);
  const [replayDirectory, setReplayDirectory] = useState<string>(
    settings.REPLAY_DIRECTORY,
  );

  const saveChanges = () => {
    const validationResult = validateSettings(
      wsPort,
      wsPassword,
      replayDirectory,
    );
    if (validationResult.status === 'success')
      setSettings({
        WS_PORT: wsPort,
        WS_PASSWORD: wsPassword,
        REPLAY_DIRECTORY: replayDirectory,
      });
    props.toggleAlert(validationResult.status, validationResult.message);
  };

  // Toggle the theme mode
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Box
        position="fixed"
        top="50%"
        left="50%"
        sx={{
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: '65%',
          bgcolor: 'background.paper', // Use theme value for background color
          boxShadow: 3,
          borderRadius: 2,
          p: 4,
          opacity: 1,
        }}
      >
        {' '}
        <div>
          <FormControlLabel
            control={<Switch checked={isDark} onChange={toggleTheme} />}
            label="Toggle Dark Mode" // TODO - Change this to be an element
            sx={{
              position: 'absolute',
              top: 8, // Adjust as necessary
              left: 25, // Adjust as necessary}
            }}
          />
          <IconButton
            sx={{
              position: 'absolute',
              top: 8, // Adjust as necessary
              right: 8, // Adjust as necessary
            }}
            onClick={() => {
              props.closeSettings();
            }}
          >
            <CancelTwoToneIcon color={'error'} />
          </IconButton>
        </div>
        {/* Add your setting inputs here */}
        <Typography
          variant="h4"
          sx={{
            position:
              'relative' /* Set position to absolute for positioning inside container */,
            left: '40%' /* Move to the center horizontally */,
            color: 'black',
            userSelect: 'none',
          }}
        >
          Settings
        </Typography>
        <PortSetting port={wsPort} setPort={setWsPort} />
        <PasswordSetting password={wsPassword} setPassword={setWsPassword} />
        <DirectorySetting
          directory={replayDirectory}
          setDirectory={setReplayDirectory}
        />
        <Button
          className="save-button"
          variant="contained"
          color="success"
          startIcon={<CheckCircleOutlineTwoToneIcon />}
          onClick={saveChanges}
        >
          Save Changes
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default SettingsContainer;
