import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainContainer from './components/main-container/MainContainer';
import Background from './components/background/Background';
import SidebarTest from './components/sidebar/Sidebar';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainContainer>
              <Background>
                <SidebarTest></SidebarTest>
              </Background>
            </MainContainer>
          }
        />
      </Routes>
    </Router>
  );
}
