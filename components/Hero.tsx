
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={`${baseUrl}images/level.mp4`}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Very light dark film over video */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* Subtle left-to-right gradient to anchor text focus */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent"></div>

      {/* Content Container - Left Aligned */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex flex-col justify-center">
        
        {/* Imposing Title */}
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white font-extralight leading-[0.95] tracking-tighter reveal" style={{ transitionDelay: '300ms' }}>
            <span className="block text-brand-gold font-black italic tracking-normal drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">LEVEL</span>
            <span className="block mt-2 text-4xl md:text-6xl lg:text-7xl font-thin tracking-[-0.05em] text-white/90">
              {t('hero_title_suffix')}
            </span>
          </h1>

          {/* Minimalist Subtext */}
          <p className="mt-10 whitespace-pre-line text-zinc-300 text-lg md:text-xl font-light tracking-wide max-w-2xl leading-relaxed border-l border-brand-gold/40 pl-8 reveal" style={{ transitionDelay: '500ms' }}>
            {t('hero_desc')}
          </p>
        </div>
      </div>

      {/* Visual edge detail */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
