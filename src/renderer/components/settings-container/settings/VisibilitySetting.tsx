import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
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

      <FormControl sx={{ width: '25ch', pr: '25px' }}>
        {' '}
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Visibility
        </InputLabel>
        <NativeSelect
          defaultValue={
            process.env.NODE_ENV === 'development' ? 'unlisted' : 'public'
          }
          inputProps={{
            name: 'Visibility',
            id: 'uncontrolled-native',
          }}
          onChange={(event) => handleVisibilityChange(event.target.value)}
        >
          <option value={'public'}>Public</option>
          <option value={'unlisted'}>Unlisted</option>
          <option value={'private'}>Private</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
