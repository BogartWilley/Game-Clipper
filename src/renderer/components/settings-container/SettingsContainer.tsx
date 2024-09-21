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

import { createTheme, ThemeProvider } from '@mui/material/styles';
import './setting-container.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// TODO : Make the theme a Context, so that the sidebar and other potential elements can inherit the state

// Create themes
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
  const [wsPassword, setWsPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
            left: '33%' /* Move to the center horizontally */,
            color: 'black',
            userSelect: 'none',
          }}
        >
          Settings Page
        </Typography>
        <Box
          sx={{
            mt: '30px', // Add margin to the top to separate from other content
            pt: '10px', // Add padding inside the box
            pb: '10px', // Add padding inside the box
            pr: '10px', // Add padding inside the box
            pl: '10px', // Add padding inside the box
            border: '1px solid', // Solid border for a square box look
            borderColor: 'grey.500', // Border color
            borderRadius: 2, // Rounded corners (use 0 for sharp corners if preferred)
            boxShadow: 2, // Add a subtle shadow for depth
            backgroundColor: 'background.default', // Use theme's default background color
            display: 'flex', // Ensure the hint and input field are side by side
            alignItems: 'center', // Align the items vertically in the center
            justifyContent: 'space-between', // Make sure the input doesn't push the hint text away
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Clean font
              fontSize: '16px', // Adjust font size for better readability
              fontWeight: 'bold', // Bold for emphasis
              color: 'text.primary', // Adapt to the theme's text color
              userSelect: 'none', // Disable text selection for the label
              mr: 2, // Add a little margin to the right of the text for spacing
            }}
          >
            Paste OBS's Websocket Password here:
          </Typography>

          <FormControl sx={{ width: '25ch', pr: '25px' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Button
          className="save-button"
          variant="contained"
          color="success"
          startIcon={<CheckCircleOutlineTwoToneIcon />}
        >
          Save Changes
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default SettingsContainer;
