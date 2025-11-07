import { useState, useEffect } from "react";
import api from "../utils/api";
import CreatePostForm from "../components/CreatePostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data.reverse());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewPost = (post) => setPosts([post, ...posts]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col items-center">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-lg shadow-lg py-4 px-8 flex justify-between items-center z-50 border-b border-gray-700">
        <h1 className="text-2xl font-extrabold tracking-wide">
          Social<span className="text-blue-500">App</span>
        </h1>
        <div className="flex gap-6 items-center">
          <button className="hover:text-blue-400 font-semibold transition">Home</button>
          <button className="hover:text-blue-400 font-semibold transition">Profile</button>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition shadow-md">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-start mt-28 px-4 pb-16">
        <div className="w-full max-w-2xl bg-[#111827]/70 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-6">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-100">Create a Post</h2>
          <CreatePostForm onPostCreated={handleNewPost} />
        </div>

        <div className="w-full max-w-2xl flex flex-col gap-6 mt-10">
          {posts.length === 0 ? (
            <p className="text-gray-300 text-center mt-10 text-lg italic">
              No posts yet. Be the first to post!
            </p>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </main>

      {/* Footer (optional) */}
      <footer className="text-gray-400 text-sm py-4">
        © {new Date().getFullYear()} SocialApp. Built with ❤️ using MERN.
      </footer>
    </div>
  );
};

export default Home;
