
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const FullMatImage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative h-[700px] w-full parallax-bg overflow-hidden" 
             style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2065&auto=format&fit=crop")' }}>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute inset-0 flex items-center justify-center p-8 text-center reveal">
        <div className="max-w-4xl">
          <span className="text-brand-gold font-black tracking-[0.6em] text-[10px] uppercase block mb-6">{t('philosophy_title')}</span>
          <h2 className="text-white text-4xl md:text-7xl font-light tracking-tighter leading-tight uppercase">
            {t('philosophy_text')} <br />
            <span className="font-bold italic text-white">{t('philosophy_sub')}</span>
          </h2>
          <div className="mt-12 w-28 h-[2px] bg-brand-gold mx-auto shadow-[0_0_20px_#C5A028]"></div>
        </div>
      </div>
    </section>
  );
};

export default FullMatImage;
