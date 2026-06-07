import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantDashboard from './pages/RestaurantDashboard';
import NgoDashboard from './pages/NgoDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  const PublicRoute = ({ children }) => {
    return user ? <Navigate to="/dashboard" replace /> : children;
  };

  const normalizeRole = (role) => (role ? String(role).toUpperCase() : '');

  const DashboardRedirect = () => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    const role = normalizeRole(user.role);
    if (role === 'RESTAURANT' || role === 'HOTEL') return <Navigate to="/restaurant-dashboard" replace />;
    if (role === 'NGO') return <Navigate to="/ngo-dashboard" replace />;
    if (role === 'ADMIN') return <Navigate to="/admin-dashboard" replace />;
    return <Navigate to="/login" replace />;
  };

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardRedirect /></PrivateRoute>} />
          <Route
            path="/restaurant-dashboard"
            element={<ProtectedRoute allowedRole={['RESTAURANT', 'HOTEL']}><RestaurantDashboard /></ProtectedRoute>}
          />
          <Route
            path="/ngo-dashboard"
            element={<ProtectedRoute allowedRole="NGO"><NgoDashboard /></ProtectedRoute>}
          />
          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute allowedRole="ADMIN"><AdminDashboard /></ProtectedRoute>}
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Navigate to={user ? '/dashboard' : '/'} replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
