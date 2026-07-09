import React, { useEffect, memo } from 'react';
import { LandingPageConfig } from '../types';

interface VSLPlayerProps {
  config: LandingPageConfig;
  onPlayStarted: () => void;
  viewerCount: number;
}

// Separate the raw player element to a static component that never re-renders.
// This prevents React from destroying the player's DOM when viewerCount or config changes.
const VTurbElement = memo(() => {
  useEffect(() => {
    const scriptId = 'vturb-script-6a501cdb6ed339666565405b';
    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://scripts.converteai.net/46ca464a-d021-47df-bcfd-6093e65477ca/players/6a501cdb6ed339666565405b/v4/player.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div 
      className="w-full relative"
      dangerouslySetInnerHTML={{
        __html: `<vturb-smartplayer id="vid-6a501cdb6ed339666565405b" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"><div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 125% 0 0; z-index: 0; background-color: black;"></div></vturb-smartplayer>`
      }}
    />
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
        <span>• {viewerCount} personas están viendo este video ahora mismo</span>
      </div>
    </div>
  );
}
