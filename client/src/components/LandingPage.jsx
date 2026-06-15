const LandingPage = ({ onNavigateToAuth }) => {
  const testimonials = [
    {
      name: "Prem Kumar",
      role: "Digital Artist",
      content: "Artiqs completely transformed my workflow. The image quality from the Clipdrop integration is mind-blowing. I use it every single day.",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      name: "Piyush Birla",
      role: "Marketing Director",
      content: "We needed rapid prototyping for ad campaigns, and Artiqs delivered. The interface is ridiculously fast and easy to use.",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      name: "Kamlesh Sharma",
      role: "Indie Game Developer",
      content: "The 5 free credits let me test the waters, and I immediately bought more. Best AI image generation platform I've used in 2026.",
      rating: "⭐⭐⭐⭐⭐"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col font-sans">
      
      {/* Navigation Bar */}
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between p-6">
        <div className="text-3xl font-black tracking-tight bg-linear-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          artiqs
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigateToAuth(true)} 
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:block"
          >
            Log In
          </button>
          <button 
            onClick={() => onNavigateToAuth(false)} 
            className="rounded-full bg-teal-500 px-6 py-2.5 text-sm font-bold text-slate-900 shadow-lg shadow-teal-500/20 hover:bg-teal-400 transition-all cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="inline-block rounded-full bg-slate-800 border border-slate-700 px-4 py-1.5 text-sm font-medium text-teal-400 mb-8">
          ✨ Powered by Next-Gen AI Models
        </div>
        <h1 className="max-w-4xl text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Turn your imagination into <br className="hidden sm:block"/> 
          <span className="bg-linear-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">stunning reality.</span>
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl text-slate-400 mb-10">
          Generate breathtaking, high-quality images in seconds with Artiqs. Join thousands of creators and bring your wildest ideas to life today.
        </p>
        <button 
          onClick={() => onNavigateToAuth(false)} 
          className="rounded-full bg-linear-to-r from-teal-500 to-blue-600 px-10 py-5 text-lg font-bold text-white shadow-xl shadow-teal-500/30 hover:scale-105 transition-transform cursor-pointer"
        >
          Start Generating for Free
        </button>
        <p className="mt-4 text-sm text-slate-500">No credit card required. Get 5 free credits on signup.</p>
      </main>

      {/* Testimonials Section */}
      <section className="bg-slate-800/50 py-24 border-y border-slate-800">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-16">
            Loved by creators worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl bg-slate-800 p-8 border border-slate-700 hover:border-teal-500/50 transition-colors">
                <div className="text-sm mb-4">{testimonial.rating}</div>
                <p className="text-slate-300 italic mb-6">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-500">
        <div className="text-2xl font-black tracking-tight bg-linear-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-4 opacity-50">
          artiqs
        </div>
        <p>&copy; 2026 Praveen Thanvi. All rights reserved.</p>
        <p className="mt-2">
          Contact: <a href="mailto:pthanvi10@gmail.com" className="text-teal-400 hover:text-teal-300 transition-colors">pthanvi10@gmail.com</a>
        </p>
      </footer>

    </div>
  );
};

export default LandingPage;