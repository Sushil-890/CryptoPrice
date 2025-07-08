import { Link } from 'react-router-dom';
import { useState } from 'react';

function NavComponent({ onToggleTheme, isLoggedIn, username, handleLogout }) {
  const [isDark, setIsDark] = useState(true);

  const handleThemeToggle = () => {
    setIsDark((prev) => !prev);
    onToggleTheme(!isDark);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="nav-logo">CryptoPulse</div>
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/buy" className="nav-link">Buy Crypto</Link>
        <Link to="/about" className="nav-link">About</Link>
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <span className="profile-button">👤 {username}</span>
            <button onClick={handleLogout} className="logout-button">🚪 Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-button">🔐 Login</Link>
            <Link to="/signup" className="signup-button">📝 Sign Up</Link>
          </>
        )}

        <button onClick={handleThemeToggle} className="theme-toggle">
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

export default NavComponent;
