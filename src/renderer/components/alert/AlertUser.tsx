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
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (isExiting) {
      // Delay the closure of the alert in the parent until the animation is done
      const timer = setTimeout(() => {
        setCloseAlert(true);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isExiting, setCloseAlert]);

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
            sx={{ filter: 'brightness(90%)' }}
            onClose={() => setIsExiting(true)}
          >
            {message}
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
