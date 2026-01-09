// src/Pages/Register.tsx
import { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) return setError("Passwords mismatch");
    setError('');
    setLoading(true);
    try {
      await registerUser(formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-[420px] bg-neutral-900/40 border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
        <h2 className="text-3xl font-black italic uppercase text-white mb-8 tracking-tighter text-center">Join Crew</h2>
        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase text-center rounded-xl tracking-widest">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-neutral-600">Name</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-500/50 transition-all" placeholder="Akira Nakai" />
          </div>
          <div className="space-y-1">
            <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-neutral-600">Email</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-500/50 transition-all" placeholder="driver@tunerpage.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-neutral-600">Pass</label>
              <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-500/50 transition-all" placeholder="••••" />
            </div>
            <div className="space-y-1">
              <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-neutral-600">Confirm</label>
              <input type="password" required value={formData.password_confirmation} onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-500/50 transition-all" placeholder="••••" />
            </div>
          </div>
          <button disabled={loading} className="w-full bg-indigo-600 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-indigo-500 transition-all active:scale-95 mt-4">
            {loading ? "Initializing..." : "Register Build"}
          </button>
        </form>
      </div>
    </div>
  );
}