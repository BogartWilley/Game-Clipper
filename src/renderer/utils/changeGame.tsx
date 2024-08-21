const possibleGames: Array<string> = [
  'KOF XIII',
  'USF4',
  'GUILTY GEAR STRIVE',
  'TEKKEN 8',
];
function changeGame(game: string) {
  if (possibleGames.includes(game)) {
    window.electron.ipcRenderer.sendMessage('change-game', [game]);
    return;
  } else {
    console.error('Invalid game');
    throw new Error(`Invalid game: ${game}`);
  }
}
export { changeGame };
