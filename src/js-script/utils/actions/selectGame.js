const KOF_XIII = {
  name: 'KOF XIII',
  fullName: 'The King Of Fighters XIII',
  windowId:
    'The King of Fighters XIII:F9D96469-6208-4609-AA55-1192042585C3:kofxiii.exe',
};
const USF4 = {
  name: 'USF4',
  fullName: 'Ultra Street Fighter IV',
  windowId: 'SSFIVAE:SSFIVAE:SSFIV.exe',
};
const GGS = {
  name: 'GUILTY GEAR STRIVE',
  fullName: 'Guilty Gear Strive',
  windowId: 'Guilty Gear -Strive-  :UnrealWindow:GGST-Win64-Shipping.exe',
};
const TEKKEN_8 = {
  name: 'TEKKEN 8',
  fullName: 'TEKKEN 8',
  windowId: 'foobar',
};
const PLACEHOLDER_GAME = {
  name: 'Uninitialized',
  fullName: 'Uninitialized',
  windowId: 'Uninitialized',
};

const possibleGames = [KOF_XIII, USF4, GGS, TEKKEN_8];

function updateSelectedGame() {
  console.log(
    `updateSelectedGame fired,this is the env var : ${process.env.CURRENT_GAME}`,
  );
  const selectedGame =
    possibleGames.find((game) => game.name === process.env.CURRENT_GAME) ||
    PLACEHOLDER_GAME;
  return selectedGame;
}

module.exports = { updateSelectedGame };
