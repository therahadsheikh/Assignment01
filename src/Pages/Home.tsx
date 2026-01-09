// src/Pages/Home.tsx
import { useEffect, useState } from 'react';
import { fetchPosts } from '../api';
import { Link } from 'react-router-dom';

export default function Home({ isLight }: { isLight: boolean }) {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts(1).then(res => setPosts(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className={`text-4xl font-black italic uppercase mb-12 border-l-4 border-sky-500 pl-6 ${isLight ? 'text-black' : 'text-white'}`}>Build Feed</h1>
      <div className="space-y-6">
        {posts.map(post => (
          <Link to={`/posts/${post.id}`} key={post.id} className="block group">
            <div className={`p-8 rounded-[2rem] border transition-all ${
              isLight ? 'bg-white border-neutral-200 hover:border-sky-500 shadow-sm' : 'bg-neutral-900/40 border-white/5 hover:border-sky-500/50'
            }`}>
              <div className="flex justify-between mb-4">
                <span className="text-[10px] font-black uppercase text-sky-500 bg-sky-500/10 px-3 py-1 rounded-full">{post.user.name}</span>
              </div>
              <h2 className="text-2xl font-bold uppercase italic mb-2 tracking-tight">{post.title}</h2>
              <p className={`text-sm line-clamp-2 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>{post.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}