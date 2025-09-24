
import { Routes, Route } from 'react-router-dom';
import Inventory from './layout/components/Inventory';
import Login from './features/auth/pages/Login';
import './App.css';
import Navbar from './layout/components/Navbar'; // Adjust path as needed

function App() {
  return (
    <div className="App">
      <Navbar /> {/* Navbar rendered once at the app level */}
      <Routes>
        <Route path="/" element={<Login />} /> {/* Changed from /u to /login */}
        <Route path="/fdf" element={<Inventory />} />
        <Route path="/inventory" element={<Inventory />} /> {/* Match Navbar link */}
        <Route path="/dashboard" element={<Inventory />} /> {/* Placeholder for Dashboard */}
      </Routes>
    </div>
  );
}

export default App;
