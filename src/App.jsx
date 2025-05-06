
import { useState, useEffect } from 'react';
import Login from './Login';
import PropertyList from './PropertyList';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem('va_token', token);
  };

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('va_token');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('va_token');
    if (storedToken) {      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && token) {
      fetchProperties();
    }
  }, [isLoggedIn, token]);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://staging.valuationsafrica.mw/api/v2/properties', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      
      const data = await response.json();
      setProperties(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Valuations Africa</h1>
        {isLoggedIn && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </header>
      
      <main className="app-main">
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <PropertyList 
            properties={properties} 
            loading={loading} 
            error={error} 
            onRefresh={fetchProperties}
          />
        )}
      </main>
      
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Valuations Africa. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;