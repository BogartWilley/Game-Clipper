import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainContainer from './components/main-container/MainContainer';
import Background from './components/background/Background';
import { GameProvider } from './contexts/GameContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ErrorProvider } from './contexts/ErrorContext';
import { TimerProvider } from './contexts/TimerContext';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <GameProvider>
              <TimerProvider>
                <ErrorProvider>
                  <SettingsProvider>
                    <MainContainer>
                      <Background></Background>
                    </MainContainer>
                  </SettingsProvider>
                </ErrorProvider>
              </TimerProvider>
            </GameProvider>
          }
        />
      </Routes>
    </Router>
  );
}
