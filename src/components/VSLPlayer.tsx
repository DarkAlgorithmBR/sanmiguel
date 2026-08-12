import React, { useEffect, useState, memo } from 'react';
import { LandingPageConfig } from '../types';

interface VSLPlayerProps {
  config: LandingPageConfig;
  onPlayStarted: () => void;
  viewerCount: number;
}

// Separate the raw player element to a static component that never re-renders.
// This prevents React from destroying the player's DOM when viewerCount or config changes.
const VTurbElement = memo(() => {
  const [embedUrl, setEmbedUrl] = useState<string>('');

  useEffect(() => {
    // Build direct embed URL without needing about:blank inline onload trick
    const search = window.location.search || '?';
    const href = encodeURIComponent(window.location.href);
    const url = `https://scripts.converteai.net/7afa7b90-a8d5-41d5-9f8d-bd1e20c59d59/players/6a7bfa8ab5c6baff83ea57bf/v4/embed.html${search}&vl=${href}`;
    setEmbedUrl(url);

    // Load VTurb SDK script
    const sdkId = 'vturb-sdk-script';
    if (!document.getElementById(sdkId)) {
      const s = document.createElement("script");
      s.id = sdkId;
      s.src = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
      s.async = true;
      document.head.appendChild(s);
    }

    // Load VTurb Player script for full smartplayer support
    const playerId = 'vturb-player-script';
    if (!document.getElementById(playerId)) {
      const s2 = document.createElement("script");
      s2.id = playerId;
      s2.src = "https://scripts.converteai.net/7afa7b90-a8d5-41d5-9f8d-bd1e20c59d59/players/6a7bfa8ab5c6baff83ea57bf/v4/player.js";
      s2.async = true;
      document.head.appendChild(s2);
    }
  }, []);

  return (
    <div id="ifr_6a7bfa8ab5c6baff83ea57bf_wrapper" style={{ margin: '0 auto', width: '100%', maxWidth: '400px' }}>
      <div style={{ position: 'relative', padding: '178.21782178217822% 0 0 0' }} id="ifr_6a7bfa8ab5c6baff83ea57bf_aspect">
        {embedUrl ? (
          <iframe
            id="ifr_6a7bfa8ab5c6baff83ea57bf"
            src={embedUrl}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="origin"
          />
        ) : (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000' }} />
        )}
      </div>
    </div>
  );
});

VTurbElement.displayName = 'VTurbElement';

export default function VSLPlayer({ config, onPlayStarted, viewerCount }: VSLPlayerProps) {
  useEffect(() => {
    // Signal play started immediately so that the landing page functions correctly
    onPlayStarted();
  }, [onPlayStarted]);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center" id="vsl-container">
      {/* Centered VTurb Player Container with a clean shadow/border styling */}
      <div className="w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/60 shadow-2xl transition-all duration-300 hover:border-amber-500/30 p-1 md:p-2">
        <VTurbElement />
      </div>

      {/* Under-video viewer indicator */}
      <div className="text-center mt-4 text-slate-400 text-xs font-sans flex items-center justify-center space-x-1.5">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        <span>• {viewerCount} personnes regardent cette vidéo en ce moment</span>
      </div>
    </div>
  );
}
