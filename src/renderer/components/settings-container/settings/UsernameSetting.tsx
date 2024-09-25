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
  FormHelperText,
} from '@mui/material';
import { color } from 'framer-motion';
import { useState } from 'react';

interface usernameSettingProps {
  username: string;
  setUsername: (pwd: string) => void;
}
export default function UsernameSetting({
  username,
  setUsername,
}: usernameSettingProps) {
  const [error, setError] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(true);

  const handleUsernameChange = (usernameField: string) => {
    if (usernameField.length === 0) {
      setEmpty(true);
      setError(false); // Reset error when input is empty
      setUsername(usernameField);
      return;
    }

    if (usernameField.length >= 20) {
      return;
    }

    const isValid = /^[a-zA-Z0-9-_ ]+$/.test(usernameField);
    setUsername(usernameField);

    if (isValid) {
      console.log(usernameField);
      setError(false);
      setEmpty(false); // Mark as not empty if valid input is provided
    } else {
      console.warn(
        'Invalid username. Only letters, numbers, "-", "_" are allowed, and max length is 30 characters.',
      );
      setError(true);
    }
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
        Insert your username:
      </Typography>

      <FormControl sx={{ width: '25ch', pr: '25px' }} variant="standard">
        <InputLabel
          htmlFor="standard-adornment-username"
          style={{
            textDecoration: 'none',
            color: error ? 'red' : undefined,
          }} // Apply 'red' if error is true, otherwise leave it unchanged
        >
          {error ? 'Invalid Username' : 'Username'}
        </InputLabel>
        <Input
          id="standard-adornment-username"
          type="text"
          value={username}
          onChange={(e) => {
            handleUsernameChange(e.target.value);
          }}
          error={error || empty}
        />
      </FormControl>
    </Box>
  );
}
