// src/Pages/Login.tsx
import { useState } from 'react';
import { loginUser } from '../api';

interface LoginProps {
  isLight: boolean;
}

export default function Login({ isLight }: LoginProps) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginUser(formData);
      window.location.href = '/'; 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex min-h-[80vh] items-center justify-center px-4 transition-colors ${isLight ? 'bg-neutral-50' : 'bg-[#0a0a0a]'}`}>
      <div className={`w-full max-w-[400px] border p-10 rounded-[2.5rem] shadow-2xl transition-all ${
        isLight ? 'bg-white border-neutral-200' : 'bg-neutral-900/40 border-white/5'
      }`}>
        <h2 className={`text-4xl font-black italic uppercase mb-8 tracking-tighter text-center ${isLight ? 'text-black' : 'text-white'}`}>Login</h2>
        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase text-center rounded-xl">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Email</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full border rounded-2xl px-6 py-4 outline-none transition-all ${
                isLight ? 'bg-neutral-50 border-neutral-200 text-black focus:border-sky-500' : 'bg-white/5 border-white/10 text-white focus:border-sky-500'
              }`} placeholder="driver@tuner.com" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Password</label>
            <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
              className={`w-full border rounded-2xl px-6 py-4 outline-none transition-all ${
                isLight ? 'bg-neutral-50 border-neutral-200 text-black focus:border-sky-500' : 'bg-white/5 border-white/10 text-white focus:border-sky-500'
              }`} placeholder="••••••••" />
          </div>
          <button disabled={loading} className="w-full bg-sky-500 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-sky-400 transition-all">
            {loading ? "Verifying..." : "Enter Garage"}
          </button>
        </form>
      </div>
    </div>
  );
}