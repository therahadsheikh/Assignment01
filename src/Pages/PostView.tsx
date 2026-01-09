// src/Pages/PostView.tsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchSinglePost, createComment, deletePost, deleteComment } from '../api';

export default function PostView({ isLight }: { isLight: boolean }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [text, setText] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Refresh user state from localStorage on every view
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
    
    if (id) fetchSinglePost(id).then(setPost);
  }, [id]);

  const handleDelComm = async (cId: number) => {
    if (!window.confirm("Delete comment?")) return;
    await deleteComment(cId);
    setPost({ ...post, comments: post.comments.filter((c: any) => c.id !== cId) });
  };

  if (!post) return <div className="p-20 text-center uppercase font-black text-sky-500">Loading Build...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-between mb-8">
        <Link to="/" className="text-[10px] font-black uppercase text-neutral-500">← Back</Link>
        {user?.id === post.user_id && (
          <button onClick={() => deletePost(post.id).then(() => navigate('/'))} className="text-[10px] font-black uppercase text-red-500 border border-red-500/20 px-4 py-1 rounded-full">Delete Post</button>
        )}
      </div>

      <div className={`p-10 rounded-[2.5rem] border shadow-xl ${isLight ? 'bg-white border-neutral-200' : 'bg-neutral-900/30 border-white/5'}`}>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-6">{post.title}</h1>
        <p className={`text-lg leading-relaxed border-b pb-12 mb-10 ${isLight ? 'text-neutral-600 border-neutral-100' : 'text-neutral-400 border-white/5'}`}>{post.content}</p>

        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-500 mb-8">Communications</h3>
          
          {localStorage.getItem('token') && (
            <form onSubmit={async (e) => {
              e.preventDefault();
              const res = await createComment(post.id, text);
              setPost({...post, comments: [res.comment, ...post.comments]});
              setText('');
            }} className="mb-10 flex gap-2">
              <input value={text} onChange={e => setText(e.target.value)} placeholder="Type comment..." 
                className={`flex-grow px-6 py-4 rounded-2xl outline-none border transition-all ${isLight ? 'bg-neutral-50 border-neutral-200 focus:border-sky-500' : 'bg-white/5 border-white/10 focus:border-sky-500'}`} />
              <button className="bg-sky-500 text-white px-8 rounded-2xl font-black uppercase text-[10px]">Send</button>
            </form>
          )}

          <div className="space-y-4">
            {post.comments.map((c: any) => (
              <div key={c.id} className={`p-6 rounded-2xl border ${isLight ? 'bg-neutral-50 border-neutral-100' : 'bg-white/5 border-white/5'}`}>
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-black text-sky-500 uppercase">{c.user.name}</span>
                  {/* CRITICAL FIX: Direct ID comparison with debug log if needed */}
                  {user?.id === c.user_id && (
                    <button onClick={() => handleDelComm(c.id)} className="text-[9px] font-black text-red-500 uppercase border border-red-500/20 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition-all">Delete</button>
                  )}
                </div>
                <p className={`text-sm ${isLight ? 'text-neutral-700' : 'text-neutral-400'}`}>{c.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}