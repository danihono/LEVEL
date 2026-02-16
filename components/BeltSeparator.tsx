
import React from 'react';

const BeltSeparator: React.FC = () => {
  return (
    <div className="relative w-full h-28 flex items-center justify-center my-2 z-30 pointer-events-none select-none">
      {/* Faixa Horizontal de Fundo */}
      <div className="absolute left-0 right-0 h-11 bg-[#0a0a0a] shadow-[0_10px_30px_rgba(0,0,0,0.9)] flex flex-col justify-between py-1.5 overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/denim.png')]"></div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full h-[1.5px] bg-white/5 shadow-inner"></div>
        ))}
      </div>

      {/* O NÓ REALISTA (SVG para formas complexas e orgânicas) */}
      <div className="relative w-[320px] h-full flex items-center justify-center translate-y-2">
        <svg viewBox="0 0 400 150" className="w-full h-full drop-shadow-[0_15px_25px_rgba(0,0,0,1)]">
          <defs>
            <linearGradient id="belt-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="50%" stopColor="#0a0a0a" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
            <filter id="fabric-tex" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
              <feDiffuseLighting in="noise" lightingColor="#ffffff" surfaceScale="1" result="diffuse">
                <feDistantLight azimuth="45" elevation="45" />
              </feDiffuseLighting>
              <feComposite in="diffuse" in2="SourceGraphic" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />
            </filter>
          </defs>

          {/* Sombra projetada do nó */}
          <ellipse cx="200" cy="110" rx="140" ry="15" fill="black" opacity="0.6" filter="blur(8px)" />

          {/* Ponta Esquerda (Com a Ponteira Vermelha) */}
          <g transform="rotate(-15, 100, 80) translate(20, 10)">
            <path d="M50,40 L160,40 L160,80 L50,80 Z" fill="url(#belt-grad)" />
            {/* Costuras na ponta */}
            <path d="M50,45 L160,45 M50,52 L160,52 M50,59 L160,59 M50,66 L160,66 M50,73 L160,73" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
            
            {/* Ponteira Vermelha Realista */}
            <rect x="55" y="40" width="45" height="40" fill="#b2181d" />
            {/* Graus (Brancos) */}
            <rect x="62" y="45" width="3" height="30" fill="white" opacity="0.9" />
            <rect x="70" y="45" width="3" height="30" fill="white" opacity="0.9" />
            <rect x="78" y="45" width="3" height="30" fill="white" opacity="0.9" />
            <rect x="86" y="45" width="3" height="30" fill="white" opacity="0.9" />
            <rect x="94" y="45" width="3" height="30" fill="white" opacity="0.9" />
          </g>

          {/* Ponta Direita */}
          <g transform="rotate(18, 300, 80) translate(-30, 10)">
            <path d="M240,40 L350,40 L350,80 L240,80 Z" fill="url(#belt-grad)" />
            <path d="M240,45 L350,45 M240,52 L350,52 M240,59 L350,59 M240,66 L350,66 M240,73 L350,73" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
          </g>

          {/* O NÓ CENTRAL (Camadas de sobreposição) */}
          {/* Parte de trás do laço */}
          <path d="M165,45 Q200,30 235,45 L235,85 Q200,70 165,85 Z" fill="#050505" stroke="rgba(255,255,255,0.05)" />
          
          {/* O laço principal cruzado */}
          <path d="M175,40 Q215,35 235,70 L220,105 Q190,75 160,85 Z" fill="url(#belt-grad)" stroke="rgba(255,255,255,0.05)" />
          
          {/* A dobra final do nó */}
          <path d="M165,55 Q190,40 220,50 L225,90 Q195,80 170,95 Z" fill="#121212" stroke="rgba(255,255,255,0.1)" />
          
          {/* Sombras internas do nó para realismo */}
          <path d="M185,55 Q200,48 215,55" fill="none" stroke="black" strokeWidth="3" opacity="0.5" />
          <path d="M190,85 Q210,80 230,95" fill="none" stroke="black" strokeWidth="4" opacity="0.7" />
        </svg>

        {/* Efeito de brilho tátil no nó */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Brilho volumétrico ambiente que percorre a faixa */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-[shimmer_12s_infinite]"></div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default BeltSeparator;
