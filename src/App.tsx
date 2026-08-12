import React, { useState, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  Lock, 
  Crown
} from 'lucide-react';
import { LandingPageConfig, Comment } from './types';
import { INITIAL_CONFIG, INITIAL_COMMENTS } from './defaultData';
import VSLPlayer from './components/VSLPlayer';
import CommentsSection from './components/CommentsSection';

export default function App() {
  // 1. Initial Configurations and state
  const [config, setConfig] = useState<LandingPageConfig>(INITIAL_CONFIG);

  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem('vsl_landing_comments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Get user-created comments (starting with C-)
          const userComments = parsed.filter((c: Comment) => c && c.id && c.id.startsWith('C-'));
          return [...userComments, ...INITIAL_COMMENTS];
        }
      } catch (e) {
        // Fallback to defaults
      }
    }
    return INITIAL_COMMENTS;
  });

  const [vslStarted, setVslStarted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [viewerCount, setViewerCount] = useState(config.viewerCountStart);
  const [urgencyDateString, setUrgencyDateString] = useState('');

  // Save states to local storage on change
  useEffect(() => {
    localStorage.removeItem('vsl_landing_config');
  }, []);

  useEffect(() => {
    localStorage.setItem('vsl_landing_comments', JSON.stringify(comments));
  }, [comments]);

  // 2. Fluctuating Live Viewer Count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const variance = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const next = prev + variance;
        // Keep it bounded around our seed value
        const minBound = config.viewerCountStart - 20;
        const maxBound = config.viewerCountStart + 20;
        if (next < minBound) return minBound;
        if (next > maxBound) return maxBound;
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [config.viewerCountStart]);

  // Reset viewer count if seed changes
  useEffect(() => {
    setViewerCount(config.viewerCountStart);
  }, [config.viewerCountStart]);

  // 3. Dynamic Urgency Date Calculation (Today's local client date, updating automatically)
  useEffect(() => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    
    setUrgencyDateString(`${day}/${month}/${year}`);
  }, []);

  // 4. Handle VSL start and delay timer logic
  const handleVslPlayStarted = useCallback(() => {
    setVslStarted(true);
    
    if (config.formShowOption === 'always') {
      setShowForm(true);
    } else if (config.formShowOption === 'after_video') {
      setShowForm(true);
    } else if (config.formShowOption === 'delayed') {
      // Form delay trigger
      setTimeout(() => {
        setShowForm(true);
        // Scroll smoothly to form container once shown
        setTimeout(() => {
          document.getElementById('lead-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }, config.formDelaySeconds * 1000);
    }
  }, [config.formShowOption, config.formDelaySeconds]);

  // If form show option is 'always', force show it
  useEffect(() => {
    if (config.formShowOption === 'always') {
      setShowForm(true);
    } else if (!vslStarted) {
      setShowForm(false);
    }
  }, [config.formShowOption, vslStarted]);

  // 5. Testimonial user submit
  const handleAddComment = (commentData: Omit<Comment, 'id' | 'timestamp'>) => {
    const newComment: Comment = {
      id: 'C-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      author: commentData.author,
      username: commentData.username,
      rating: commentData.rating,
      content: commentData.content,
      isVerified: commentData.isVerified,
      timestamp: 'Il y a quelques secondes'
    };

    setComments((prev) => [newComment, ...prev]);
  };

  // 8. Custom Theme CSS classes map
  const getThemeClasses = () => {
    switch (config.theme) {
      case 'mystic':
        return {
          wrapper: 'bg-[#090514] text-indigo-100 font-sans min-h-screen relative overflow-hidden',
          textAccent: 'text-purple-400',
          titleFont: 'font-spiritual font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-amber-200 to-purple-100',
          bannerBg: 'bg-[#180a2b] border-b border-purple-950 text-[#e9c46a]',
          footerBg: 'bg-[#05020c] border-t border-purple-950 text-purple-300/60',
          headerGlow: 'absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none'
        };
      case 'emerald':
        return {
          wrapper: 'bg-[#020c08] text-emerald-50 font-sans min-h-screen relative overflow-hidden',
          textAccent: 'text-emerald-400',
          titleFont: 'font-spiritual font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-yellow-200 to-emerald-50',
          bannerBg: 'bg-[#041a12] border-b border-emerald-950 text-[#ffd166]',
          footerBg: 'bg-[#010604] border-t border-emerald-950 text-emerald-400/50',
          headerGlow: 'absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none'
        };
      case 'gold':
        return {
          wrapper: 'bg-[#0c0a09] text-amber-100 font-sans min-h-screen relative overflow-hidden',
          textAccent: 'text-amber-500',
          titleFont: 'font-spiritual font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200',
          bannerBg: 'bg-[#1c1917] border-b border-stone-800 text-[#eab308]',
          footerBg: 'bg-[#080706] border-t border-stone-900 text-stone-500',
          headerGlow: 'absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none'
        };
      case 'minimal':
        return {
          wrapper: 'bg-slate-950 text-slate-100 font-sans min-h-screen relative overflow-hidden',
          textAccent: 'text-white underline decoration-amber-500 decoration-2 underline-offset-4',
          titleFont: 'font-display font-extrabold tracking-tight text-white',
          bannerBg: 'bg-slate-900 border-b border-slate-800 text-amber-400',
          footerBg: 'bg-black border-t border-slate-900 text-slate-600',
          headerGlow: 'absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-white/5 blur-[100px] rounded-full pointer-events-none'
        };
      case 'navy':
      default:
        return {
          wrapper: 'bg-[#030712] text-slate-100 font-sans min-h-screen relative overflow-hidden',
          textAccent: 'text-amber-400',
          titleFont: 'font-spiritual font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-300',
          bannerBg: 'bg-[#050b1d] border-b border-[#0f172a] text-[#ffc107]',
          footerBg: 'bg-[#02040a] border-t border-[#0e1628] text-slate-500',
          headerGlow: 'absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-900/10 blur-[130px] rounded-full pointer-events-none'
        };
    }
  };

  const theme = getThemeClasses();

  return (
    <div className={theme.wrapper} id="main-landing-root">
      
      {/* Decorative ambient background blur */}
      <div className={theme.headerGlow}></div>

      {/* Dynamic Background Stars / Sacred Particles decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      {/* 1. Urgency Bar (Top Banner) matching visual screenshot perfectly */}
      <div 
        className={`w-full py-2.5 px-4 text-center font-bold font-sans text-xs sm:text-sm ${theme.bannerBg} uppercase tracking-wider relative z-10`}
        id="urgency-banner"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-center space-x-1.5 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping mr-1"></span>
          <span>{config.urgencyBannerText}</span>
          <span className="text-white bg-red-600/20 border border-red-500/30 px-2 py-0.5 rounded ml-1 tracking-widest font-mono">
            {urgencyDateString}
          </span>
        </div>
      </div>

      {/* 2. Hero Headline Area */}
      <header className="pt-10 pb-6 px-4 max-w-4xl mx-auto text-center relative z-10" id="hero-header">
        
        {/* Spiritual emblem or small subtle badge */}
        <div className="mb-4 flex justify-center animate-fade-in">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-amber-500/10 text-amber-400 text-[10px] uppercase font-black rounded-full border border-amber-500/20 tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fréquence Sacrée Activée</span>
          </div>
        </div>

        {/* Dynamic customized Headline */}
        <h1 
          className={`text-3xl md:text-5xl lg:text-6xl ${theme.titleFont} font-extrabold max-w-3xl mx-auto leading-tight md:leading-[1.15]`}
          id="main-headline"
        >
          {config.headline}
        </h1>

        {/* Subtitle / Secondary descriptor hook */}
        {config.subheadline && config.subheadline.trim() !== '' && (
          <p className="mt-4 text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {config.subheadline}
          </p>
        )}
      </header>

      {/* 3. Central Centered VSL Area */}
      <main className="px-4 pb-16 space-y-12 relative z-10" id="main-content">
        
        {/* VSL component */}
        <section id="vsl-section">
          <VSLPlayer 
            config={config} 
            onPlayStarted={handleVslPlayStarted} 
            viewerCount={viewerCount}
          />
        </section>

        <hr className="border-slate-800 max-w-xl mx-auto" />

        {/* 5. Clear Social Proof: Exact comments from screenshot */}
        <section id="comments-section" className="pt-2">
          <CommentsSection 
            comments={comments} 
            onAddComment={handleAddComment} 
          />
        </section>

      </main>

      {/* 6. Footer containing compliant disclaimers, terms links and platform notes */}
      <footer className={`${theme.footerBg} py-12 px-4 text-center text-xs space-y-6 relative z-10`} id="footer">
        
        {/* Compliance details */}
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center space-x-1.5 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
            <Crown className="w-4 h-4 text-amber-500" />
            <span>Fréquence Divine Officielle © {new Date().getFullYear()}</span>
          </div>

          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed text-[11px]">
            Ce site web n'est pas affilié, approuvé ou parrainé officiellement par Facebook, Google, YouTube ou Hotmart. Les résultats décrits sont des témoignages personnels et peuvent varier d'une personne à l'autre selon la foi et la régularité de la pratique.
          </p>
        </div>

        {/* Terms links */}
        <div className="flex items-center justify-center space-x-4 text-[11px] font-bold text-slate-400">
          <a href="#privacy" className="hover:text-amber-400 transition-colors">Politique de Confidentialité</a>
          <span>•</span>
          <a href="#terms" className="hover:text-amber-400 transition-colors">Conditions d'Utilisation</a>
          <span>•</span>
          <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
        </div>

        {/* Simple security trust seal */}
        <div className="flex items-center justify-center space-x-1.5 text-slate-600 text-[10px]">
          <Lock className="w-3.5 h-3.5" />
          <span>Chiffrement SSL 256 bits</span>
        </div>
      </footer>

    </div>
  );
}
