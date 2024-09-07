import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Grid,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme for custom styling (optional)
const theme = createTheme({
  typography: {
    h4: {
      fontWeight: 'bold',
    },
  },
});

const SettingsContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        position="fixed"
        top="50%"
        left="50%"
        sx={{
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: '65%',
          bgcolor: 'white',
          boxShadow: 3,
          borderRadius: 2,
          p: 4,
          opacity: 1,
        }}
      >
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
