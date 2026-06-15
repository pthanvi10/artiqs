import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ImageGenerator = () => {
  const { user, setUser } = useContext(AuthContext);
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/image/generate`, {
        userId: user._id,
        prompt: prompt
      });

      setImageUrl(response.data.image);
      setUser({ ...user, credits: response.data.creditBalance });
      setPrompt('');

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate image. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl bg-slate-800 p-8 shadow-xl border border-slate-700/50">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Create Artwork</h2>
        <p className="text-slate-400 text-sm mt-1">Spend 1 ⚡ to generate a high-quality image.</p>
      </div>

      {/* Display Canvas */}
      <div className="relative mb-8 flex aspect-square w-full sm:aspect-video items-center justify-center overflow-hidden rounded-xl bg-slate-900 border border-slate-700">
        {imageUrl ? (
          <img src={imageUrl} alt="AI Generated" className="h-full w-full object-contain" />
        ) : loading ? (
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-teal-500"></div>
            <p className="mt-4 text-sm font-medium text-slate-400 animate-pulse">Generating your imagination...</p>
          </div>
        ) : (
          <p className="text-slate-500">Your artwork will appear here</p>
        )}
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-rose-500/10 p-4 text-sm font-medium text-rose-400 border border-rose-500/20">
          {error}
        </div>
      )}

      {/* Prompt Input Form */}
      <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          required
          disabled={loading}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to see..."
          className="flex-1 rounded-xl bg-slate-900 border border-slate-700 p-4 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || user.credits < 1}
          className="whitespace-nowrap rounded-xl bg-linear-to-r from-teal-500 to-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-teal-500/20 hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? 'Generating...' : 'Generate (1 ⚡)'}
        </button>
      </form>
    </div>
  );
};

export default ImageGenerator;
