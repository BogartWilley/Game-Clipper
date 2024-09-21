import { Visibility, VisibilityOff } from '@mui/icons-material';
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
import { useState } from 'react';
export default function PasswordSettings(props: any) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
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
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
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
  );
}
