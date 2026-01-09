// src/Pages/Register.tsx
import { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate, Link } from 'react-router-dom';

interface RegisterProps {
  isLight: boolean;
}

export default function Register({ isLight }: RegisterProps) {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    password_confirmation: '' 
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.password_confirmation) {
      return alert("Passwords do not match!");
    }

    setLoading(true);
    try {
      await registerUser(formData);
      alert("Registration successful!");
      navigate('/'); 
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full p-4 rounded-2xl border outline-none transition-all focus:ring-2 focus:ring-sky-500/20 ${
    isLight ? 'bg-neutral-50 border-neutral-200 text-black' : 'bg-white/5 border-white/10 text-white'
  }`;

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className={`p-10 rounded-[2.5rem] border ${isLight ? 'bg-white border-neutral-200 shadow-2xl' : 'bg-neutral-900 border-white/5 shadow-black'}`}>
        <h2 className="text-3xl font-black italic uppercase mb-8 tracking-tighter">Join the Garage</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            required 
            placeholder="Name"
            className={inputClass}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
          <input 
            required 
            type="email" 
            placeholder="Email"
            className={inputClass}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <input 
            required 
            type="password" 
            placeholder="Password"
            className={inputClass}
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
          <input 
            required 
            type="password" 
            placeholder="Confirm Password"
            className={inputClass}
            onChange={e => setFormData({...formData, password_confirmation: e.target.value})}
          />

          <button 
            disabled={loading}
            className="w-full bg-sky-500 py-4 rounded-2xl text-[11px] font-black uppercase text-white hover:bg-sky-400 mt-4 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-8 text-[10px] font-bold uppercase text-neutral-500">
          Already a member? <Link to="/login" className="text-sky-500 ml-1">Login</Link>
        </p>
      </div>
    </div>
  );
}