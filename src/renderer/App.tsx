import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainContainer from './components/main-container/MainContainer';
import Background from './components/background/Background';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainContainer>
              <Background></Background>
            </MainContainer>
          }
        />
      </Routes>
    </Router>
  );
}
