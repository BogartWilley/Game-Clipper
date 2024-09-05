import { createContext, useState, useContext } from 'react';

export interface PossibleGames {
  KOF_XIII: 'KOF XIII';
  USF4: 'USF4';
  GUILTY_GEAR_STRIVE: 'GUILTY GEAR STRIVE';
  TEKKEN_8: 'TEKKEN 8';
  DEFAULT: 'default';
}

interface GameContextType {
  currentGame: keyof PossibleGames; // Current game is one of the keys of PossibleGames
  setCurrentGame: (game: keyof PossibleGames) => void; // Function accepts a key of PossibleGames
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize currentGame with a valid key from PossibleGames, e.g., 'KOF_XIII'
  const [currentGame, setCurrentGame] =
    useState<keyof PossibleGames>('KOF_XIII'); // Note the type here

  return (
    <GameContext.Provider value={{ currentGame, setCurrentGame }}>
      {children}
    </GameContext.Provider>
  );
};
