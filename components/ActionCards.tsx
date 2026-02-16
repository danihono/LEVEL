
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const ActionCards: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-transparent py-12 px-4 md:px-0">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[450px] bg-zinc-950 overflow-hidden flex flex-col justify-center p-12 reveal border border-[#C5A028]/10 group">
          <div 
            className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-1000 bg-cover bg-center grayscale"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-white text-4xl font-bold tracking-tight mb-4 uppercase">
              {t('action_affiliate_title')} <span className="text-brand-gold underline underline-offset-8 decoration-gold/50">{t('action_affiliate_span')}</span>
            </h2>
            <p className="text-zinc-500 mb-10 max-w-sm font-light leading-relaxed">{t('action_affiliate_desc')}</p>
            <button className="bg-brand-gold hover:brightness-110 text-black px-10 py-4 text-[10px] font-black tracking-widest transition-all uppercase gold-glow">
               {t('nav_contact')}
            </button>
          </div>
        </div>

        <div className="relative h-[450px] bg-zinc-950 overflow-hidden flex flex-col justify-center p-12 reveal border border-white/5 group" style={{ transitionDelay: '200ms' }}>
           <div 
            className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-1000 bg-cover bg-center grayscale"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-white text-4xl font-bold tracking-tight mb-4 uppercase">
              {t('action_student_title')} <span className="text-brand-gold underline underline-offset-8 decoration-gold/50">{t('action_student_span')}</span>
            </h2>
            <p className="text-zinc-500 mb-10 max-w-sm font-light leading-relaxed">{t('action_student_desc')}</p>
            <button className="bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black px-10 py-4 text-[10px] font-black tracking-widest transition-all uppercase">
              {t('hero_btn_units')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionCards;
