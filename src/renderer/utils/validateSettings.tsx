function validateSettings(
  wsPort: number,
  wsPassword: string,
  replayDirectory: string,
) {
  if (!wsPort) {
    return {
      status: 'warning',
      message: 'Please insert a valid port number before proceeding.',
    };
  }
  if (!wsPassword) {
    return {
      status: 'warning',
      message: 'Please insert a valid password before proceeding.',
    };
  }
  if (!replayDirectory) {
    return {
      status: 'warning',
      message: 'Please insert a valid directory path before proceeding.',
    };
  }
  return {
    status: 'success',
    message: 'Saves applied successfully!.',
  };
}
export { validateSettings };
