// src/App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CreatePost from './Pages/CreatePost';
import PostView from './Pages/PostView';
import { logoutUser, getCurrentUser } from './api';
import './index.css';

function App() {
  const [isLight, setIsLight] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const handleLogout = () => {
    logoutUser(); // Clears localStorage
    setUser(null); // Clears state
    window.location.href = '/'; // Redirects to home
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-500 ${isLight ? 'bg-neutral-50 text-black' : 'bg-black text-white'}`}>
        <nav className="flex justify-between items-center px-8 py-6 border-b border-white/5">
          <Link to="/" className="text-2xl font-black italic uppercase tracking-tighter">TunerPage</Link>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsLight(!isLight)}
              className="text-[10px] font-bold uppercase tracking-widest border border-current px-3 py-1 rounded-full"
            >
              {isLight ? '🌙 Dark' : '☀️ Light'}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/create" className="text-[10px] font-black uppercase text-sky-500">Add Build</Link>
                <button onClick={handleLogout} className="text-[10px] font-black uppercase text-red-500 hover:underline">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-[10px] font-black uppercase">Login</Link>
                <Link to="/register" className="text-[10px] font-black uppercase">Join</Link>
              </div>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home isLight={isLight} />} />
          <Route path="/login" element={<Login isLight={isLight} />} />
          <Route path="/register" element={<Register isLight={isLight} />} />
          <Route path="/create" element={<CreatePost isLight={isLight} />} />
          <Route path="/posts/:id" element={<PostView isLight={isLight} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;