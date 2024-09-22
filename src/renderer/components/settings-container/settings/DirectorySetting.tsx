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
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const handleSelectDirectory = () => {
    if (dialogOpen) return;
    window.electron.ipcRenderer.sendMessage('select-replay-directory', [
      directory,
    ]);
    setDialogOpen(true);
  };
  useEffect(() => {
    const handleReply = (...args: unknown[]) => {
      const replayPath = args[0] as string;
      setDirectory(replayPath);
      setDialogOpen(false);
      console.log(replayPath);
    };

    const cleanupEventListener = window.electron.ipcRenderer.on(
      'select-replay-directory-reply',
      handleReply,
    );

    return () => {
      cleanupEventListener(); // This cleans up the event listener,since the .on() method already has .removeEventListener
    };
  }, []); // Empty dependency array means this runs on mount/unmount

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
          value={directory || ''} // Prevents the value from being null,even though i've used useState<string>("")
          readOnly // It prevents the user from changing the value of the field (not from interacting with the field).
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
