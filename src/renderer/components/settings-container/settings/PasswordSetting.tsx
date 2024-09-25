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

interface PasswordSettingProps {
  password: string;
  setPassword: (pwd: string) => void;
}

export default function PasswordSettings({
  password,
  setPassword,
}: PasswordSettingProps) {
  const [error, setError] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleSetPassword(passwordField: string) {
    if (passwordField.length === 0 || passwordField.length <= 6) {
      setError(true);
    } else {
      setError(false);
    }
    setPassword(passwordField);
  }

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
        Paste OBS's Websocket Password here:
      </Typography>

      <FormControl sx={{ width: '25ch', pr: '25px' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            handleSetPassword(e.target.value);
          }}
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
          error={error}
        />
      </FormControl>
    </Box>
  );
}
