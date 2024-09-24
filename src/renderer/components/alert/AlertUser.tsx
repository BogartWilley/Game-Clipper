import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [key, setKey] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    if (closeAlert) {
      // Trigger the parent to handle closure after animation ends
      const timeout = setTimeout(() => {
        setCloseAlert(true);
      }, 700); // Match the exit animation duration (0.7s)

      return () => clearTimeout(timeout);
    }
  }, [closeAlert, setCloseAlert]);

  const handleClose = () => {
    setIsExiting(true); // Start exit animation
    setLocalCloseAlert(true); // Trigger useEffect to eventually unmount
    setKey(key + 1);
  };

  return !closeAlert ? (
    <AnimatePresence>
      <motion.div
        className="alert-box"
        initial={{ x: +950 }}
        exit={{ opacity: 0, x: +950 }} // Slide out animation before unmounting
        transition={{ duration: 0.7, ease: 'easeInOut' }} // Match with timeout delay
      >
        <Alert
          severity={status}
          variant="filled"
          sx={{ filter: 'brightness(90%)' }}
          onClose={handleClose} // Close the alert when clicked
        >
          {message}
        </Alert>
      </motion.div>
    </AnimatePresence>
  ) : null;
};
