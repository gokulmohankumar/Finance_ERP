import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

// Import your page components
import LoginPage from './pages/AdminLogin';
import RegisterPage from './pages/Register';
import FinanceErpLandingPage from './pages/LandingPage';
import DashboardLayout from './pages/Dashboard';


// Import the new ProtectedRoute component
import ProtectedRoute from './context/Protectedroute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<FinanceErpLandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;