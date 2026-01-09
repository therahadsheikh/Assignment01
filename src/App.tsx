// src/App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PostView from './Pages/PostView';
import CreatePost from './Pages/CreatePost';
import { logoutUser, getCurrentUser } from './api';

function Navbar({ isLight, setIsLight }: { isLight: boolean, setIsLight: any }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      getCurrentUser().then(data => setUser(data));
    }
  }, [token]);

  return (
    <nav className={`sticky top-0 z-50 border-b px-8 py-4 flex items-center justify-between transition-colors ${
      isLight ? 'bg-white border-neutral-200' : 'bg-[#0a0a0a] border-white/5'
    }`}>
      <Link to="/" className={`text-2xl font-black uppercase italic tracking-tighter ${isLight ? 'text-black' : 'text-white'}`}>
        Tuner<span className="text-sky-500 not-italic">Page</span>
      </Link>
      
      <div className="flex items-center gap-6">
        <button onClick={() => setIsLight(!isLight)} className={`text-[10px] font-black uppercase p-2 rounded-lg border ${
          isLight ? 'border-neutral-200 text-neutral-600' : 'border-white/10 text-white'
        }`}>
          {isLight ? '🌙 Dark' : '☀️ Light'}
        </button>

        {token ? (
          <div className="flex items-center gap-6">
            <Link to="/create-post" className="text-[10px] font-black uppercase text-sky-500">+ New Build</Link>
            <span className={`text-[10px] font-black uppercase ${isLight ? 'text-neutral-900' : 'text-sky-400'}`}>{user?.name}</span>
            <button onClick={() => { logoutUser(); navigate('/login'); }} className="text-[10px] font-black uppercase text-red-500">Logout</button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className={`text-[10px] font-black uppercase ${isLight ? 'text-neutral-600' : 'text-white'}`}>Login</Link>
            <Link to="/register" className="bg-sky-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase">Join</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  const [isLight, setIsLight] = useState(false);

  return (
    <BrowserRouter>
      <div className={`${isLight ? 'bg-neutral-50 text-neutral-900' : 'bg-[#0a0a0a] text-white'} min-h-screen transition-colors`}>
        <Navbar isLight={isLight} setIsLight={setIsLight} />
        <Routes>
          <Route path="/" element={<Home isLight={isLight} />} />
          <Route path="/login" element={<Login isLight={isLight} />} />
          <Route path="/register" element={<Register isLight={isLight} />} />
          <Route path="/posts/:id" element={<PostView isLight={isLight} />} />
          <Route path="/create-post" element={<CreatePost isLight={isLight} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}