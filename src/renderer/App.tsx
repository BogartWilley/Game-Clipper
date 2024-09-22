import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainContainer from './components/main-container/MainContainer';
import Background from './components/background/Background';
import { GameProvider } from './contexts/GameContext';
import { SettingsProvider } from './contexts/SettingsContext';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <GameProvider>
              <SettingsProvider>
                <MainContainer>
                  <Background></Background>
                </MainContainer>
              </SettingsProvider>
            </GameProvider>
          }
        />
      </Routes>
    </Router>
  );
}
