// src/Pages/PostView.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSinglePost, createComment, deleteComment, getCurrentUser } from '../api';

interface PostViewProps {
  isLight: boolean;
}

export default function PostView({ isLight }: PostViewProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [postRes, userRes] = await Promise.all([
        fetchSinglePost(id!),
        getCurrentUser()
      ]);
      setPost(postRes.data || postRes);
      setCurrentUser(userRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localStorage.getItem('token')) return alert("Please login to comment");
    try {
      await createComment(id, commentText);
      setCommentText('');
      loadData(); // Refresh list
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteComment = async (commentId: any) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await deleteComment(commentId);
      loadData(); // Refresh list
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-20 text-sky-500 font-black text-center italic animate-pulse">LOADING...</div>;

  // SORTING: Create a reversed copy of the comments array (last comment first)
  const sortedComments = post?.comments ? [...post.comments].reverse() : [];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button onClick={() => navigate(-1)} className="mb-8 text-[10px] font-black uppercase text-sky-500 hover:underline">
        ← Back to Feed
      </button>

      <div className={`p-10 rounded-[3rem] border ${
        isLight ? 'bg-white border-neutral-200 shadow-2xl' : 'bg-neutral-900 border-white/5 shadow-black'
      }`}>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-6">{post.title}</h1>
        <p className={`text-lg leading-relaxed mb-12 ${isLight ? 'text-neutral-600' : 'text-neutral-300'}`}>
          {post.content}
        </p>

        <div className={`h-px w-full mb-12 ${isLight ? 'bg-neutral-100' : 'bg-white/5'}`} />

        <section>
          <h3 className="text-xl font-black italic uppercase mb-8">Discussion</h3>
          
          <form onSubmit={handleComment} className="mb-12">
            <textarea 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className={`w-full p-6 rounded-3xl border outline-none transition-all focus:ring-2 focus:ring-sky-500/20 ${
                  isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-white/10 border-white/10 text-white'
              }`}
              placeholder="Write a comment..."
            />
            <button className="mt-4 bg-sky-500 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase hover:bg-sky-400">
              Post Comment
            </button>
          </form>

          <div className="space-y-6">
            {sortedComments.length > 0 ? sortedComments.map((c: any) => (
              <div key={c.id} className={`p-6 rounded-3xl border flex justify-between items-start ${
                isLight ? 'bg-neutral-50 border-neutral-100' : 'bg-white/5 border-white/5'
              }`}>
                <div>
                  <p className="text-sm leading-relaxed">{c.content}</p>
                  <p className="text-[9px] font-bold text-neutral-500 uppercase mt-4">User #{c.user_id}</p>
                </div>
                
                {/* DELETE BUTTON: Only show if current logged in user ID matches comment's user_id */}
                {currentUser && currentUser.id === c.user_id && (
                  <button 
                    onClick={() => handleDeleteComment(c.id)}
                    className="text-[9px] font-black uppercase text-red-500 bg-red-500/10 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white transition-all"
                  >
                    Delete
                  </button>
                )}
              </div>
            )) : (
              <p className="text-neutral-600 uppercase text-[10px] font-bold italic">No comments yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}