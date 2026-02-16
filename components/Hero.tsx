
import React from 'react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-black">
      {/* Background Image - Fullscreen focus */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[30s] scale-105"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        {/* Uniform Overlay for legibility */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Subtle left-to-right gradient to anchor text focus */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
      </div>

      {/* Content Container - Left Aligned */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex flex-col justify-center">
        
        {/* Logo - Minimalist approach */}
        <div className="mb-12 opacity-90 h-16 md:h-20 flex justify-start reveal" style={{ transitionDelay: '100ms' }}>
          <Logo className="h-full" variant="light" showText={false} />
        </div>

        {/* Imposing Title */}
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white font-extralight leading-[0.95] tracking-tighter uppercase reveal" style={{ transitionDelay: '300ms' }}>
            <span className="block opacity-80">{t('hero_elevate')}</span>
            <span className="text-brand-gold font-black italic drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">LEVEL</span>
            <span className="block mt-2 text-4xl md:text-6xl lg:text-7xl font-thin tracking-[-0.05em] text-white/90">
              {t('hero_jiujitsu')}
            </span>
          </h1>

          {/* Minimalist Subtext */}
          <p className="mt-10 text-zinc-300 text-lg md:text-xl font-light tracking-wide max-w-lg leading-relaxed border-l border-brand-gold/40 pl-8 reveal" style={{ transitionDelay: '500ms' }}>
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
