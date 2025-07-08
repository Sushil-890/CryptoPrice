import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NavComponent from './components/NavComponent';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import About from './pages/About';
import BuyCrypto from './pages/BuyCrypto';
import './App.css';

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
 
useEffect(() => {
  const token = localStorage.getItem('token');
  const storedUsername = localStorage.getItem('username');
  setIsLoggedIn(!!token);
  if (storedUsername) setUsername(storedUsername);
}, []);

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  setIsLoggedIn(false);
  setUsername('');
};

  return (
    <div className={darkTheme ? 'app dark' : 'app'}>
      <Router>
        <NavComponent onToggleTheme={setDarkTheme} 
        isLoggedIn={isLoggedIn}
        username={username}
        handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/buy" element={<BuyCrypto />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername}/>} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
