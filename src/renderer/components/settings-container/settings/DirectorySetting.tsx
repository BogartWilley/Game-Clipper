import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { useState, useEffect } from 'react';

interface DirectorySettingProps {
  directory: string;
  setDirectory: (dir: string) => void;
}

export default function DirectorySetting({
  directory,
  setDirectory,
}: DirectorySettingProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(
    () => !directory || directory.length === 0,
  );

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
      setIsEmpty(!replayPath || replayPath.trim() === '');
      setDialogOpen(false);
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
        sx={{ width: '25ch', pr: '25px', mr: '0px' }}
        variant="standard"
      >
        <InputLabel htmlFor="directory-input">Replay Directory</InputLabel>
        <Input
          id="directory-input"
          value={directory || ''} // Prevents the value from being null,even though i've used useState<string>("")
          readOnly // It prevents the user from changing the value of the field (not from interacting with the field).
          error={isEmpty}
          endAdornment={
            <InputAdornment position="end">
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleSelectDirectory}
                >
                  <FolderIcon />
                </IconButton>
              </InputAdornment>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}
