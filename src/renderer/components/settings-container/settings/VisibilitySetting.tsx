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
  MenuItem,
  Select,
} from '@mui/material';
import { useState } from 'react';

interface VisibilitySettingProps {
  visibility: string;
  setVisibility: (v: string) => void;
}

export default function VisibilitySetting({
  visibility,
  setVisibility,
}: VisibilitySettingProps) {
  const handleVisibilityChange = (visibility: string): void => {
    setVisibility(visibility);
    console.log(visibility);
  };
  return (
    <Box
      className={'options-container'}
      sx={{
        mt: '25px',
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
        Change video visibility (Youtube only)
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Visibility</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={visibility}
          label="Age"
          onChange={(event) => handleVisibilityChange(event.target.value)}
        >
          <MenuItem value={'public'}>Public</MenuItem>
          <MenuItem value={'unlisted'}>Unlisted</MenuItem>
          <MenuItem value={'private'}>Private</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
