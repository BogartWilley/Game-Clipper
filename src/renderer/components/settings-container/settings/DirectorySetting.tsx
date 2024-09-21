import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from '@mui/material';
import { useState, useEffect } from 'react';

export default function DirectorySelector(props: any) {
  const [directory, setDirectory] = useState<string>('');

  // Handler for selecting download directory
  const handleSelectDirectory = () => {
    window.electron.ipcRenderer.sendMessage('select-download-directory', []);
  };

  // Listen for the response from the IPC
  /*   useEffect(() => {
    window.electron.ipcRenderer.on('selected-directory', (path: string) => {
      setDirectory(path); // Set the selected directory path
    });

    // Clean up the listener on component unmount
    return () => {
      window.electron.ipcRenderer.removeListener(
        'selected-directory',
        () => {},
      );
    };
  }, []); */

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
        Select the replay directory:
      </Typography>

      <FormControl
        sx={{ width: '25ch', pr: '25px', mr: '20px' }}
        variant="standard"
      >
        <InputLabel htmlFor="directory-input">Selected Directory</InputLabel>
        <Input
          id="directory-input"
          value={directory}
          readOnly // Make the input read-only since the directory is selected via a button
          endAdornment={
            <InputAdornment position="end">
              <Button variant="contained" onClick={handleSelectDirectory}>
                Browse
              </Button>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}
