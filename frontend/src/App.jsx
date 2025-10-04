// import React from 'react';
// import { useState } from 'react';
// import Landing from './pages/Landing';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import Questions from './pages/Questions';

// export default function App() {
//   const [route, setRoute] = useState('landing');
//   const token = localStorage.getItem('token');
//   const user = JSON.parse(localStorage.getItem('user') || 'null');

//   return (
//     <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
//       <nav style={{ marginBottom: 20 }}>
//         <button onClick={() => setRoute('landing')}>Home</button>{' '}
//         <button onClick={() => setRoute('questions')}>Questions</button>{' '}
//         {!token ? (
//           <>
//             <button onClick={() => setRoute('register')}>Register</button>
//             <button onClick={() => setRoute('login')}>Login</button>
//           </>
//         ) : (
//           <>
//             <span style={{ marginLeft: 10 }}>Hi, {user?.name}</span>
//             <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.reload(); }}>Logout</button>
//           </>
//         )}
//       </nav>

//       <main>
//         {route === 'landing' && <Landing />}
//         {route === 'register' && <Register onDone={() => setRoute('questions')} />}
//         {route === 'login' && <Login onDone={() => setRoute('questions')} />}
//         {route === 'questions' && <Questions />}
//       </main>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Sparkles, UserPlus, LogIn, LogOut, Home, MessageSquare } from 'lucide-react';
import './App.css';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Questions from './pages/Questions';

export default function App() {
  const [route, setRoute] = useState('landing');
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setRoute('landing');
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <nav className="nav-bar">
        <div className="nav-brand">
          <Sparkles size={24} />
          <span>Cosmos Q&A</span>
        </div>
        <div className="nav-links">
          <button onClick={() => setRoute('landing')} className="nav-btn">
            <Home size={18} />
            Home
          </button>
          <button onClick={() => setRoute('questions')} className="nav-btn">
            <MessageSquare size={18} />
            Questions
          </button>
          {!token ? (
            <>
              <button
                onClick={() => setRoute('register')}
                className="nav-btn nav-btn-primary"
              >
                <UserPlus size={18} />
                Register
              </button>
              <button
                onClick={() => setRoute('login')}
                className="nav-btn nav-btn-secondary"
              >
                <LogIn size={18} />
                Login
              </button>
            </>
          ) : (
            <>
              <span className="nav-user">Hi, {user?.name}</span>
              <button onClick={handleLogout} className="nav-btn nav-btn-logout">
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Page Rendering */}
      <main className="main-content">
        {route === 'landing' && (
          <Landing
            onRegister={() => setRoute('register')}
            onLogin={() => setRoute('login')}
          />
        )}
        {route === 'register' && (
          <Register onDone={() => setRoute('questions')} />
        )}
        {route === 'login' && <Login onDone={() => setRoute('questions')} />}
        {route === 'questions' && <Questions />}
      </main>
    </div>
  );
}

