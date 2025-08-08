import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/AdminLogin';
import RegisterPage from './pages/Register';
import FinanceErpLandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FinanceErpLandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
