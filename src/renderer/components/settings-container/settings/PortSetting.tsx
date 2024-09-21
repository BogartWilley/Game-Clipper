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
export default function Port(props: any) {
  const [portNumber, setPortNumber] = useState<string>('');
  const handlePortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    if (value.length > 5) {
      return;
    }
    if (/^\d*$/.test(value)) {
      setPortNumber(value);
    }
    console.log(portNumber);
  };
  return (
    <Box
      sx={{
        mt: '30px',
        pt: '10px',
        pb: '10px',
        pr: '10px',
        pl: '10px',
        border: '1px solid',
        borderColor: 'grey.500',
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '16px',
          fontWeight: 'bold',
          color: 'text.primary',
          userSelect: 'none',
          mr: 2,
        }}
      >
        Paste OBS's Websocket port number here:
      </Typography>

      <FormControl sx={{ width: '25ch', pr: '25px' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-port">Port Number</InputLabel>
        <Input
          id="standard-adornment-port"
          value={portNumber}
          onChange={handlePortChange}
          inputMode="numeric" // Use numeric keyboard on mobile devices
          sx={{ MozAppearance: 'textfield' }} // Remove Firefox's arrows for input type number
          endAdornment={<InputAdornment position="end"> </InputAdornment>}
        />
      </FormControl>
    </Box>
  );
}
