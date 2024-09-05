import * as React from 'react';
import Box from '@mui/joy/Box';
import { motion } from 'framer-motion';
import './setting-container.css';
export default function BoxSystemProps() {
  // May change into this : https://mui.com/material-ui/react-container/
  return (
    <motion.div className="settings-container">
      <Box
        sx={{
          height: 480,
          width: 650,
          my: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          p: 2,
          border: '2px solid rgb(85, 85, 85)',
          backgroundColor: 'rgba(156, 156, 156, 0.859)',
        }}
      >
        This Box uses MUI System props for quick customization.
      </Box>
    </motion.div>
  );
}
