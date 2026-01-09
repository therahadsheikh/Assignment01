// src/Pages/CreatePost.tsx
import { useState } from 'react';
import { createPost } from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPost({ title, content });
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-neutral-900/40 border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
        <h2 className="text-3xl font-black italic uppercase text-white mb-8 tracking-tighter">New Build Log</h2>
        {error && <div className="mb-6 p-4 bg-red-500/10 text-red-400 text-[10px] font-black uppercase rounded-xl">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Title</label>
            <input required value={title} onChange={e => setTitle(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-500/50" 
              placeholder="e.g. Stage 2 Turbo Install" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Content</label>
            <textarea required rows={6} value={content} onChange={e => setContent(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-500/50 resize-none" 
              placeholder="Describe your progress..." />
          </div>
          <button disabled={loading} className="w-full bg-indigo-600 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-indigo-500 active:scale-95">
            {loading ? "Publishing..." : "Post to Feed"}
          </button>
        </form>
      </div>
    </div>
  );
}