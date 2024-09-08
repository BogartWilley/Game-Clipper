import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Grid,
  Button,
  IconButton,
} from '@mui/material';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  const [isDark, setIsDark] = useState(true);

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
        <FormControlLabel
          control={<Switch checked={isDark} onChange={toggleTheme} />}
          label="Toggle Dark Mode"
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
        <Typography variant="h4" align="center" gutterBottom>
          Settings
        </Typography>
        <Grid container spacing={3}>
          {/* Add your setting inputs here */}
          <Grid item xs={12}>
            <TextField fullWidth label="Username" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Email" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch />}
              label="Enable Notifications"
            />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default SettingsContainer;
