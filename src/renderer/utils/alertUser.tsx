import React from 'react';
import Alert from '@mui/material/Alert';

export type AlertStatusType = 'success' | 'info' | 'warning' | 'error';

export function alertUser(status: AlertStatusType, message: string) {
  console.log('alertUser fired ');
  return <Alert severity={status}>{message}</Alert>;
}
