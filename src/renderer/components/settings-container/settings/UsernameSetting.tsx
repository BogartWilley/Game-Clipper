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

interface usernameSettingProps {
  username: string;
  setUsername: (pwd: string) => void;
}
import { useState } from 'react';

export default function UsernameSetting({
  username,
  setUsername,
}: usernameSettingProps) {
  const [error, setError] = useState<boolean>(true);
  function handleUsernameChange(usernameField: string) {
    if (
      usernameField.length === 0 || // Check if empty
      usernameField.length > 20 || // Check if exceeds 20 characters
      !/^[a-zA-Z0-9-_ ]+$/.test(usernameField) // Check for invalid characters
    ) {
      setError(true); // Error is true if any of these conditions are met
    } else {
      setError(false);
    }
    setUsername(usernameField);
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
        Insert your username:
      </Typography>

      <FormControl sx={{ width: '25ch', pr: '25px' }} variant="standard">
        <InputLabel
          htmlFor="standard-adornment-username"
          style={{
            textDecoration: 'none',
            color: error && username ? 'red' : undefined,
          }}
        >
          {error && username ? 'Invalid Username' : 'Username'}
        </InputLabel>
        <Input
          id="standard-adornment-username"
          type="text"
          value={username}
          onChange={(e) => {
            handleUsernameChange(e.target.value);
          }}
          error={error}
        />
      </FormControl>
    </Box>
  );
}
