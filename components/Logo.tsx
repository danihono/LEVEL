
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'full';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", variant = 'full', showText = true }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Icon portion (the stylized 'N') */}
      <svg viewBox="0 0 500 400" className="h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 350L250 100L400 350H320L250 230L180 350H100Z" fill={variant === 'light' ? 'white' : '#333333'} />
        <path d="M260 80H350V140H260V80Z" fill="#E31E24" />
        <rect x="235" y="80" width="12" height="60" fill={variant === 'light' ? 'white' : '#333333'} />
      </svg>
      
      {showText && (
        <div className="flex flex-col items-center mt-[-5%]">
          {/* "LEVEL" with the stylized font */}
          <div className="flex items-center space-x-0.5">
            <span className="text-[#F7B500] font-black text-4xl tracking-tighter" style={{ fontFamily: 'sans-serif' }}>LEVE</span>
            {/* Mirrored L / J symbol */}
            <span className="text-[#F7B500] font-black text-4xl tracking-tighter scale-x-[-1]">L</span>
          </div>
          {/* "JIU JITSU" subtext */}
          <span className={`text-[10px] font-bold tracking-[0.4em] uppercase ${variant === 'light' ? 'text-white' : 'text-zinc-800'}`}>
            JIU JITSU
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
