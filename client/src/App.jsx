import { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import ImageGenerator from './components/ImageGenerator';
import LandingPage from './components/LandingPage';
import PricingPage from './components/PricingPage'; 



function App() {
  const { user, login, register, logout } = useContext(AuthContext);
  
  // UI State Management
  const [currentTab, setCurrentTab] = useState('generator');
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true); // true = Login, false = Register
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLoginView) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      setShowAuthForm(false); // Hide auth form on success
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const openAuthForm = (isLogin) => {
    setIsLoginView(isLogin);
    setShowAuthForm(true);
    setError('');
  };

  // 1. LOGGED IN VIEW: Dashboard
 if (user) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col font-sans">
        
        {/* The New Professional Navbar */}
        <nav className="border-b border-slate-800 bg-slate-900/50 px-6 py-4 backdrop-blur-md sticky top-0 z-50">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            
            {/* Left: Logo & Navigation Links */}
            <div className="flex items-center gap-10">
              <h1 className="text-2xl font-black tracking-tight bg-linear-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                artiqs
              </h1>
              <div className="hidden sm:flex gap-6">
                <button 
                  onClick={() => setCurrentTab('generator')}
                  className={`text-sm font-medium transition-colors cursor-pointer ${currentTab === 'generator' ? 'text-teal-400' : 'text-slate-400 hover:text-white'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setCurrentTab('pricing')}
                  className={`text-sm font-medium transition-colors cursor-pointer ${currentTab === 'pricing' ? 'text-teal-400' : 'text-slate-400 hover:text-white'}`}
                >
                  Subscription Plans
                </button>
              </div>
            </div>

            {/* Right: Credits & Profile */}
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-slate-800 border border-slate-700 px-4 py-1.5 text-sm">
                <span className="text-slate-400">Balance:</span>
                <span className="font-bold text-teal-400">{user.credits} ⚡</span>
              </div>
              <div className="h-6 w-px bg-slate-700 hidden sm:block"></div>
              <span className="text-sm font-medium text-white hidden sm:block">{user.name}</span>
              <button 
                onClick={logout}
                className="rounded-lg bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>

          </div>
        </nav>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-8">
          {currentTab === 'generator' ? <ImageGenerator /> : <PricingPage />}
        </main>

      </div>
    );
  }
  // 2. AUTHENTICATION VIEW: Login/Register Form
  if (showAuthForm) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-slate-800 p-8 shadow-xl border border-slate-700/50 relative">
          
          {/* Back Button */}
          <button 
            onClick={() => setShowAuthForm(false)}
            className="absolute top-4 left-4 text-slate-400 hover:text-white cursor-pointer"
          >
            &larr; Back
          </button>

          <div className="text-center mt-4">
            <h2 className="text-4xl font-black tracking-tight bg-linear-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              artiqs
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {isLoginView ? 'Sign in to generate stunning AI artwork' : 'Create your account to get 5 free credits'}
            </p>
          </div>

          {error && (
            <div className="mt-4 rounded-lg bg-rose-500/10 p-3 text-sm font-medium text-rose-400 border border-rose-500/20">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {!isLoginView && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-700 p-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-700 p-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-700 p-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-teal-500 to-blue-600 py-3 font-bold text-white shadow-lg shadow-teal-500/20 hover:opacity-95 transition-all cursor-pointer"
            >
              {isLoginView ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <button
              type="button"
              onClick={() => { setIsLoginView(!isLoginView); setError(''); }}
              className="font-medium text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
            >
              {isLoginView ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. LOGGED OUT VIEW: Landing Page
  return <LandingPage onNavigateToAuth={openAuthForm} />;
}

export default App;