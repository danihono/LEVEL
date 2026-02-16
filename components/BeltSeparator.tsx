import React from 'react';

const BeltSeparator: React.FC = () => {
  return (
    <div className="relative w-full h-32 flex items-center justify-center my-4 z-30 pointer-events-none select-none overflow-visible">
      {/* Background horizontal belt line */}
      <div className="absolute left-0 right-0 h-10 bg-[#080808] shadow-[0_12px_40px_rgba(0,0,0,0.9)] flex flex-col justify-between py-1.5 overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/denim.png')]" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full h-[1.5px] bg-white/5 shadow-inner" />
        ))}
      </div>

      {/* Belt knot and tips */}
      <div className="relative w-[420px] h-full flex items-center justify-center translate-y-2">
        <svg viewBox="0 0 420 160" className="w-full h-full drop-shadow-[0_22px_38px_rgba(0,0,0,0.95)]">
          <defs>
            <linearGradient id="belt-surface" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#222" />
              <stop offset="45%" stopColor="#101010" />
              <stop offset="100%" stopColor="#030303" />
            </linearGradient>

            <linearGradient id="belt-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="35%" stopColor="rgba(255,255,255,0.02)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
            </linearGradient>

            <linearGradient id="knot-front" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1e1e" />
              <stop offset="55%" stopColor="#0d0d0d" />
              <stop offset="100%" stopColor="#040404" />
            </linearGradient>

            <linearGradient id="knot-fold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#151515" />
              <stop offset="100%" stopColor="#070707" />
            </linearGradient>

            <radialGradient id="knot-shadow" cx="50%" cy="55%" r="55%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.78)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="210" cy="116" rx="170" ry="13" fill="url(#knot-shadow)" opacity="0.85" />

          {/* Left tip with rank bar */}
          <g transform="translate(112 78) scale(0.9) translate(-112 -78)">
          <g transform="rotate(-19, 160, 78) translate(-8, 5)">
            <path d="M36,54 L188,58 L188,96 L36,102 Q24,102 30,78 Q24,54 36,54 Z" fill="url(#belt-surface)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <path d="M40,61 L186,65 M40,69 L186,73 M40,77 L186,81 M40,85 L186,89 M40,93 L186,97" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" fill="none" />

            <path d="M44,56 L96,58 L95,98 L42,100 Q36,78 44,56 Z" fill="#c51624" />
            <rect x="43" y="56" width="8" height="43" fill="#f3f3f3" opacity="0.95" />
            <rect x="96" y="57" width="6" height="41" fill="#f3f3f3" opacity="0.95" />

            <rect x="54" y="62" width="3.5" height="33" fill="white" opacity="0.95" rx="0.5" />
            <rect x="63" y="63" width="3.5" height="33" fill="white" opacity="0.95" rx="0.5" />
            <rect x="72" y="64" width="3.5" height="33" fill="white" opacity="0.95" rx="0.5" />
            <rect x="81" y="65" width="3.5" height="33" fill="white" opacity="0.95" rx="0.5" />
            <rect x="90" y="66" width="3.5" height="33" fill="white" opacity="0.95" rx="0.5" />
          </g>
          </g>

          {/* Right tip */}
          <g transform="translate(300 77) scale(0.9) translate(-300 -77)">
          <g transform="rotate(16, 258, 76) translate(20, 0)">
            <path d="M224,58 L370,52 Q382,53 376,77 Q382,101 370,102 L224,96 Z" fill="url(#belt-surface)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <path d="M224,64 L368,60 M224,72 L368,68 M224,80 L368,76 M224,88 L368,84 M224,96 L368,92" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" fill="none" />
          </g>
          </g>

          {/* Knot: tighter geometry with clearer folds */}
          <path d="M156,96 L212,52 L236,60 L180,108 Z" fill="#111111" stroke="rgba(255,255,255,0.1)" strokeWidth="0.9" />
          <path d="M250,60 L276,67 L223,113 L196,106 Z" fill="#090909" stroke="rgba(255,255,255,0.08)" strokeWidth="0.9" />

          <path d="M200,47 L244,57 L238,113 L197,103 Z" fill="url(#knot-front)" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
          <path d="M186,60 L200,47 L197,103 L181,106 Z" fill="url(#knot-fold)" />
          <path d="M244,57 L255,65 L249,109 L238,113 Z" fill="#0c0c0c" />

          <path d="M213,58 L227,61 L225,97 L211,94 Z" fill="#050505" />
          <path d="M209,78 L226,82 L225,94 L208,90 Z" fill="#020202" opacity="0.75" />

          {/* Knot seams and edge accents */}
          <path d="M200,51 L243,61" stroke="url(#belt-edge)" strokeWidth="1" />
          <path d="M197,102 L238,112" stroke="rgba(0,0,0,0.75)" strokeWidth="1.3" />
          <path d="M214,59 L212,94" stroke="rgba(255,255,255,0.13)" strokeWidth="0.85" />
          <path d="M188,63 L201,51" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
          <path d="M243,61 L251,67" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Subtle shimmer across the full separator */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-[shimmer_15s_infinite]" />

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
