
import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'full';
  showText?: boolean;
  useRealLogo?: boolean;
  realLogoSrc?: string;
  realLogoImgClassName?: string;
  realLogoImgStyle?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({
  className = "h-12",
  variant = 'full',
  showText = true,
  useRealLogo = false,
  realLogoSrc,
  realLogoImgClassName,
  realLogoImgStyle,
}) => {
  const [imageError, setImageError] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  if (useRealLogo && !imageError) {
    return (
      <div className={`${className} overflow-hidden`}>
        <img
          src={`${baseUrl}${realLogoSrc ?? 'images/logo-real.png'}`}
          alt="LEVEL Jiu Jitsu"
          className={`w-full h-full object-cover scale-[1.08] ${realLogoImgClassName ?? ''}`}
          style={realLogoImgStyle}
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Icon portion (the stylized 'N') */}
      <svg viewBox="0 0 500 400" className="h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 350L250 100L400 350H320L250 230L180 350H100Z" fill={variant === 'light' ? 'white' : '#C5A028'} />
        <path d="M260 80H350V140H260V80Z" fill="#E31E24" />
        <rect x="235" y="80" width="12" height="60" fill={variant === 'light' ? 'white' : '#C5A028'} />
      </svg>
      
      {showText && (
        <div className="flex flex-col items-center mt-[-5%]">
          {/* "LEVEL" with the stylized font */}
          <div className="flex items-center space-x-0.5">
            <span className="text-[#C5A028] font-black text-4xl tracking-tighter" style={{ fontFamily: 'sans-serif', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>LEVE</span>
            {/* Mirrored L / J symbol */}
            <span className="text-[#C5A028] font-black text-4xl tracking-tighter scale-x-[-1]" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>L</span>
          </div>
          {/* "JIU JITSU" subtext */}
          <span className={`text-[10px] font-bold tracking-[0.4em] uppercase ${variant === 'light' ? 'text-white' : 'text-[#C5A028]'}`}>
            JIU JITSU
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
