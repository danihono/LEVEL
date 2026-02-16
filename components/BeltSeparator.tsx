
import React from 'react';

const BeltSeparator: React.FC = () => {
  return (
    <div className="relative w-full h-32 flex items-center justify-center my-4 z-30 pointer-events-none select-none overflow-visible">
      {/* Background horizontal belt line (the part wrapped around the waist) */}
      <div className="absolute left-0 right-0 h-10 bg-[#080808] shadow-[0_12px_40px_rgba(0,0,0,0.9)] flex flex-col justify-between py-1.5 overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/denim.png')]"></div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full h-[1.5px] bg-white/5 shadow-inner"></div>
        ))}
      </div>

      {/* The KNOT - Optimized SVG for organic martial arts knot */}
      <div className="relative w-[400px] h-full flex items-center justify-center translate-y-2">
        <svg viewBox="0 0 400 160" className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)]">
          <defs>
            <linearGradient id="belt-surface" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1c1c1c" />
              <stop offset="50%" stopColor="#0a0a0a" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
            
            <radialGradient id="knot-shadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.8)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>

          {/* Sombra de contato no fundo */}
          <ellipse cx="200" cy="115" rx="160" ry="12" fill="url(#knot-shadow)" opacity="0.8" />

          {/* LEFT TAIL (Ponta com a graduação) */}
          <g transform="rotate(-18, 160, 75) translate(-10, 5)">
            <path d="M40,50 L180,55 L180,95 L40,100 Q30,100 35,75 Q30,50 40,50 Z" fill="url(#belt-surface)" />
            {/* Fabric Lines */}
            <path d="M42,58 L180,62 M42,66 L180,70 M42,74 L180,78 M42,82 L180,86 M42,90 L180,94" stroke="white" strokeWidth="0.8" strokeOpacity="0.08" fill="none"/>
            
            {/* Rank Bar (Ponteira) */}
            <path d="M45,52 L95,54 L94,96 L44,98 Q38,75 45,52" fill="#BE1E2D" />
            {/* Degrees (Graus) */}
            <rect x="52" y="58" width="3.5" height="34" fill="white" opacity="0.9" rx="0.5" transform="rotate(-1, 52, 58)"/>
            <rect x="61" y="59" width="3.5" height="34" fill="white" opacity="0.9" rx="0.5" transform="rotate(-1, 61, 59)"/>
            <rect x="70" y="60" width="3.5" height="34" fill="white" opacity="0.9" rx="0.5" transform="rotate(-1, 70, 60)"/>
            <rect x="79" y="61" width="3.5" height="34" fill="white" opacity="0.9" rx="0.5" transform="rotate(-1, 79, 61)"/>
            <rect x="88" y="62" width="3.5" height="34" fill="white" opacity="0.9" rx="0.5" transform="rotate(-1, 88, 62)"/>
          </g>

          {/* RIGHT TAIL */}
          <g transform="rotate(15, 240, 75) translate(15, 0)">
            <path d="M220,55 L360,50 Q370,50 365,75 Q370,100 360,100 L220,95 Z" fill="url(#belt-surface)" />
            {/* Fabric Lines */}
            <path d="M220,62 L358,58 M220,70 L358,66 M220,78 L358,74 M220,86 L358,82 M220,94 L358,90" stroke="white" strokeWidth="0.8" strokeOpacity="0.08" fill="none"/>
          </g>

          {/* CENTRAL KNOT BODY (Organic overlaps) */}
          {/* Back fold */}
          <path d="M165,55 Q200,35 235,55 L235,95 Q200,75 165,95 Z" fill="#050505" />
          
          {/* Main Loop (the 'over' part) */}
          <path d="M170,50 Q205,30 240,65 L225,110 Q190,85 165,90 Z" fill="url(#belt-surface)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          
          {/* Knot Detail Overlap (the 'tuck') */}
          <path d="M160,65 Q185,45 220,55 L225,95 Q195,85 165,100 Z" fill="#151515" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
          
          {/* Accent shading for depth */}
          <path d="M185,60 Q205,52 220,65" fill="none" stroke="black" strokeWidth="4" opacity="0.6" />
          <path d="M195,95 Q215,90 230,105" fill="none" stroke="black" strokeWidth="5" opacity="0.8" />
        </svg>

        {/* Tactile Highlights */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Subtle Shimmer across the whole belt */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-[shimmer_15s_infinite]"></div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(150%); }
        }
      `}</style>
    </div>
  );
};

export default BeltSeparator;
