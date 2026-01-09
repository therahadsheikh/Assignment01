// src/Pages/Home.tsx
import { useEffect, useState } from 'react';
import { fetchPosts } from '../api';
import { Link } from 'react-router-dom';

interface HomeProps {
  isLight: boolean;
}

export default function Home({ isLight }: HomeProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts(1).then(res => {
      console.log("API Response Home:", res); // Check your console to see data shape
      if (res) {
        // Handle both { data: [...] } and [...] formats
        const data = res.data || res;
        if (Array.isArray(data)) {
          setPosts(data);
        }
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className={`text-5xl font-black italic uppercase mb-12 border-l-8 border-sky-500 pl-6 tracking-tighter ${isLight ? 'text-black' : 'text-white'}`}>
        Build Feed
      </h1>

      <div className="grid gap-6">
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sky-500 uppercase font-black text-xs tracking-widest">Tuning Connection...</p>
          </div>
        ) : posts.length > 0 ? (
          posts.map((post: any) => (
            <Link to={`/posts/${post.id}`} key={post.id} className="block group">
              <div className={`p-8 rounded-[2.5rem] border transition-all duration-300 transform group-hover:-translate-y-1 ${
                isLight 
                ? 'bg-white border-neutral-200 shadow-lg hover:shadow-xl' 
                : 'bg-neutral-900/40 border-white/5 shadow-2xl hover:bg-neutral-900/60'
              }`}>
                <div className="flex justify-between items-start mb-4">
                    <h2 className={`text-2xl font-black uppercase italic leading-none ${isLight ? 'text-black' : 'text-white'}`}>
                        {post.title}
                    </h2>
                    <span className="text-[10px] font-bold text-sky-500 bg-sky-500/10 px-3 py-1 rounded-full uppercase">Verified Build</span>
                </div>
                <p className={`text-sm line-clamp-2 leading-relaxed ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    {post.content}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-24 border-2 border-dashed border-neutral-800 rounded-[3rem]">
            <p className="text-neutral-500 uppercase font-black text-xl italic mb-2">Garage is Empty</p>
            <p className="text-xs text-neutral-600 uppercase tracking-widest">No builds detected on the radar.</p>
          </div>
        )}
      </div>
    </div>
  );
}