/* eslint-disable prettier/prettier */
const possibleGames: Array<string> = [
  'KOF XIII',
  'USF4',
  'GUILTY GEAR STRIVE',
  'TEKKEN 8',
];
let selectedGame: string = possibleGames[0]; // defaults to the first possible game
function changeGame(game: string) {
  try {
    if (selectedGame === game) return;
    if (possibleGames.includes(game)) {
      window.electron.ipcRenderer.sendMessage('change-game', [game]);
      selectedGame = game;
    } else {
      console.log('Invalid game');
      throw new Error(`Invalid game: ${game}`);
    }
  } catch (err) {
    throw new Error('Failed to change the current game');
  }
}
export { changeGame };
