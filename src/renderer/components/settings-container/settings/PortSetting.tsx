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

interface PortSettingProps {
  port: number;
  setPort: (n: number) => void;
}

export default function PortSetting({ port, setPort }: PortSettingProps) {
  const handlePortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //  If it's not a number               or it exceeds 5 digits
    if (!/^\d*$/.test(e.target.value) || e.target.value.length > 5) {
      return;
    }
    const value: number = Number(e.target.value);

    setPort(value);
    console.log(port);
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
          value={port}
          onChange={handlePortChange}
          inputMode="numeric" // Use numeric keyboard on mobile devices
          sx={{ MozAppearance: 'textfield' }} // Remove Firefox's arrows for input type number
          endAdornment={<InputAdornment position="end"> </InputAdornment>}
        />
      </FormControl>
    </Box>
  );
}
