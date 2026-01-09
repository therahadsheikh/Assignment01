// src/Pages/Login.tsx
import { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await loginUser(formData);
      localStorage.setItem('token', result.token);
      window.location.href = '/'; 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 bg-[#0a0a0a]">
      <div className="w-full max-w-[400px] bg-neutral-900/40 border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
        <h2 className="text-4xl font-black italic uppercase text-white mb-8 tracking-tighter text-center">Login</h2>
        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase text-center rounded-xl tracking-widest">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-neutral-600">Email</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-sky-500/50 transition-all" placeholder="driver@tuner.com" />
          </div>
          <div className="space-y-2">
            <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-neutral-600">Password</label>
            <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-sky-500/50 transition-all" placeholder="••••••••" />
          </div>
          <button disabled={loading} className="w-full bg-sky-500 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-black hover:bg-sky-400 transition-all active:scale-95 shadow-[0_0_30px_rgba(14,165,233,0.2)]">
            {loading ? "Verifying..." : "Enter Garage"}
          </button>
        </form>
      </div>
    </div>
  );
}