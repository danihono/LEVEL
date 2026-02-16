
import React from 'react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[25s] scale-110"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/75"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-90"></div>
      </div>

      <div className="relative z-10 w-[92%] max-w-7xl h-[65vh] hero-frame flex flex-col justify-center p-10 md:p-24">
        <div className="mb-10 opacity-80 h-24 md:h-32 flex justify-start reveal" style={{ transitionDelay: '100ms' }}>
          <Logo className="h-full" variant="light" showText={false} />
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-light leading-[1.1] tracking-tighter max-w-4xl uppercase reveal" style={{ transitionDelay: '300ms' }}>
          {t('hero_elevate')} <span className="text-brand-gold font-bold italic">LEVEL</span> <br/>
          <span className="font-thin text-white/90">{t('hero_jiujitsu')}</span>
        </h1>
        <p className="mt-8 text-zinc-400 text-lg md:text-xl font-light tracking-wide max-w-xl leading-relaxed reveal" style={{ transitionDelay: '500ms' }}>
          {t('hero_desc')}
        </p>
        <div className="mt-14 flex flex-col sm:flex-row gap-6 reveal" style={{ transitionDelay: '700ms' }}>
          <button className="bg-brand-gold hover:brightness-110 text-black px-12 py-5 font-black tracking-[0.25em] transition-all duration-500 shadow-[0_10px_40px_rgba(197,160,40,0.2)] uppercase text-xs gold-glow">
            {t('hero_btn_units')}
          </button>
          <button className="group relative px-12 py-5 overflow-hidden transition-all duration-500">
            <span className="absolute inset-0 border border-[#C5A028]/30 transition-all group-hover:bg-[#C5A028]/10"></span>
            <span className="relative z-10 text-white font-bold tracking-[0.25em] text-xs uppercase">{t('hero_btn_team')}</span>
          </button>
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black via-black/40 to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black via-black/40 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
