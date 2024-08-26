const KOF_XIII = {
  name: 'KOF XIII',
  fullName: 'The King Of Fighters XIII',
  windowId:
    'The King of Fighters XIII:F9D96469-6208-4609-AA55-1192042585C3:kofxiii.exe',
};
const USF4 = {
  name: 'USF4',
  fullName: 'Ultra Street Fighter IV',
  windowId: 'foobar',
};
const GGS = {
  name: 'GUILTY GEAR STRIVE',
  fullName: 'Guilty Gear Strive',
  windowId: 'foobar',
};
const TEKKEN_8 = {
  name: 'TEKKEN 8',
  fullName: 'TEKKEN 8',
  windowId: 'foobar',
};

const possibleGames = [KOF_XIII, USF4, GGS, TEKKEN_8];

function updateSelectedGame() {
  const selectedGame =
    possibleGames.find((game) => game.name === process.env.CURRENT_GAME) ||
    possibleGames[0];
  return selectedGame;
}

module.exports = { updateSelectedGame };
