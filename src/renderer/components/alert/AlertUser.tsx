import React, { useEffect, useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import { AnimatePresence, motion } from 'framer-motion';

export type AlertStatusType = 'success' | 'info' | 'warning' | 'error';

interface AlertUserProps {
  status: AlertStatusType;
  message: string;
  setCloseAlert: (alert: boolean) => void;
  alertTimer: number;
}

export const AlertUser: React.FC<AlertUserProps> = ({
  status,
  message,
  setCloseAlert,
  alertTimer,
}) => {
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const exitTimer = useRef<NodeJS.Timeout | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  // Function to reset the exit and close timers
  const resetTimers = () => {
    // Clear both timers if they exist
    if (exitTimer.current) clearTimeout(exitTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);

    // Reset the exit timer
    exitTimer.current = setTimeout(() => {
      setIsExiting(true);
    }, alertTimer);
  };

  useEffect(() => {
    // Set the initial exit timer when the component mounts
    resetTimers();

    // Cleanup both timers when component unmounts
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [message, status]); // Reset timers when `message` or `status` changes

  useEffect(() => {
    if (isExiting) {
      // Set the close timer when the alert starts exiting
      closeTimer.current = setTimeout(() => {
        setCloseAlert(true);
      }, 600);
    }
  }, [isExiting, setCloseAlert]);

  // onClose handler to reset timers and trigger exit animation
  const handleClose = () => {
    setIsExiting(true); // Start the exit process
    resetTimers(); // Reset the timers for any new alert or onClose action
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key={`${status}-${message}`}
          className="alert-box"
          initial={{ x: +950 }}
          animate={{ x: 0 }}
          exit={{ opacity: 0, x: +950 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <Alert
            severity={status}
            variant="filled"
            onClose={handleClose} // Use the updated handleClose function
          >
            {message}
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
