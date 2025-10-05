import React, { useState } from 'react';
import { Sparkles, UserPlus, LogIn, LogOut, Home, MessageSquare, Menu, X } from 'lucide-react';
import './App.css';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Questions from './pages/Questions';

export default function App() {
  const [route, setRoute] = useState('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setRoute('landing');
    setMobileMenuOpen(false);
  };

  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-container">
      {/* Professional Navigation Bar */}
      <header className="header">
        <nav className="nav-container">
          {/* Brand Section */}
          <div className="brand-section">
            <div className="brand-logo">
              <Sparkles size={28} />
              <span className="brand-text">Cosmos Q&A</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <div className="nav-menu">
              <button 
                onClick={() => handleRouteChange('landing')} 
                className={`nav-link ${route === 'landing' ? 'active' : ''}`}
              >
                <Home size={18} />
                <span>Home</span>
              </button>
              <button 
                onClick={() => handleRouteChange('questions')} 
                className={`nav-link ${route === 'questions' ? 'active' : ''}`}
              >
                <MessageSquare size={18} />
                <span>Questions</span>
              </button>
            </div>

            <div className="nav-actions">
              {!token ? (
                <>
                  <button
                    onClick={() => handleRouteChange('login')}
                    className="btn btn-outline"
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => handleRouteChange('register')}
                    className="btn btn-primary"
                  >
                    <UserPlus size={18} />
                    <span>Get Started</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="user-info">
                    <div className="user-avatar">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="user-name">Welcome, {user?.name}</span>
                  </div>
                  <button onClick={handleLogout} className="btn btn-outline btn-logout">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-content">
            <div className="mobile-nav-menu">
              <button 
                onClick={() => handleRouteChange('landing')} 
                className={`mobile-nav-link ${route === 'landing' ? 'active' : ''}`}
              >
                <Home size={20} />
                <span>Home</span>
              </button>
              <button 
                onClick={() => handleRouteChange('questions')} 
                className={`mobile-nav-link ${route === 'questions' ? 'active' : ''}`}
              >
                <MessageSquare size={20} />
                <span>Questions</span>
              </button>
            </div>

            <div className="mobile-nav-actions">
              {!token ? (
                <>
                  <button
                    onClick={() => handleRouteChange('login')}
                    className="mobile-btn mobile-btn-outline"
                  >
                    <LogIn size={20} />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => handleRouteChange('register')}
                    className="mobile-btn mobile-btn-primary"
                  >
                    <UserPlus size={20} />
                    <span>Get Started</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="mobile-user-info">
                    <div className="user-avatar">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="user-name">Welcome, {user?.name}</span>
                  </div>
                  <button onClick={handleLogout} className="mobile-btn mobile-btn-outline">
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {route === 'landing' && (
          <Landing
            onRegister={() => handleRouteChange('register')}
            onLogin={() => handleRouteChange('login')}
          />
        )}
        {route === 'register' && (
          <Register onDone={() => handleRouteChange('questions')} />
        )}
        {route === 'login' && <Login onDone={() => handleRouteChange('questions')} />}
        {route === 'questions' && <Questions />}
      </main>
    </div>
  );
}

