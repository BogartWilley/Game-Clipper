import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';

export type AlertStatusType = 'success' | 'info' | 'warning' | 'error';

interface AlertUserProps {
  status: AlertStatusType;
  message: string;
  setCloseAlert: (alert: boolean) => void;
}

export const AlertUser: React.FC<AlertUserProps> = ({
  status,
  message,
  setCloseAlert,
}) => {
  const [closeAlert, setLocalCloseAlert] = useState<boolean>(false);

  // Handle closing the alert internally and notify parent component via `setCloseAlert`
  useEffect(() => {
    if (closeAlert) {
      setCloseAlert(true); // Notify the parent that the alert was closed
    }
  }, [closeAlert, setCloseAlert]);

  return !closeAlert ? (
    <Alert
      severity={status}
      variant="filled"
      sx={{ filter: 'brightness(90%)' }}
      onClose={() => setLocalCloseAlert(true)} // Close the alert when clicked
    >
      {message}
    </Alert>
  ) : null;
};
