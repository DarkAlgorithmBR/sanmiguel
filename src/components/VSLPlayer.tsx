import React, { useEffect, useRef, memo } from 'react';
import { LandingPageConfig } from '../types';

interface VSLPlayerProps {
  config: LandingPageConfig;
  onPlayStarted: () => void;
  viewerCount: number;
}

// Dedicated static player component that mounts the vturb-smartplayer once via DOM manipulation.
// Taking no props and using memo ensures React NEVER re-renders or destroys the player DOM node.
const VTurbElement = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean up any old iframe SDK script to avoid conflicts
    const oldSdk = document.getElementById('vturb-sdk-script');
    if (oldSdk) oldSdk.remove();

    // Prevent duplicate injection
    if (container.children.length === 0) {
      // Create <vturb-smartplayer id="vid-6a7bfa8ab5c6baff83ea57bf" style="...">
      const player = document.createElement('vturb-smartplayer');
      player.id = 'vid-6a7bfa8ab5c6baff83ea57bf';
      player.setAttribute('style', 'display: block; margin: 0 auto; width: 100%; max-width: 400px;');

      // Create <div class="vturb-player-placeholder" style="...">
      const placeholder = document.createElement('div');
      placeholder.className = 'vturb-player-placeholder';
      placeholder.setAttribute('style', 'position: relative; width: 100%; padding: 178.21782178217822% 0 0; z-index: 0; background-color: black;');

      player.appendChild(placeholder);
      container.appendChild(player);

      // Inject VTurb player.js script
      const scriptId = 'vturb-script-6a7bfa8ab5c6baff83ea57bf';
      if (!document.getElementById(scriptId)) {
        const s = document.createElement('script');
        s.id = scriptId;
        s.src = 'https://scripts.converteai.net/7afa7b90-a8d5-41d5-9f8d-bd1e20c59d59/players/6a7bfa8ab5c6baff83ea57bf/v4/player.js';
        s.async = true;
        document.head.appendChild(s);
      }
    }
  }, []);

  return <div ref={containerRef} className="w-full relative" />;
});

VTurbElement.displayName = 'VTurbElement';

export default function VSLPlayer({ onPlayStarted, viewerCount }: VSLPlayerProps) {
  useEffect(() => {
    onPlayStarted();
    // eslint-disable-next-deps
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center" id="vsl-container">
      {/* Centered VTurb Player Container with clean dark border/shadow */}
      <div className="w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/60 shadow-2xl p-1 md:p-2">
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


