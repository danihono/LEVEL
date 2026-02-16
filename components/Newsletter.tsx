
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Newsletter: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-transparent py-32 px-4 md:px-0">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-white text-3xl md:text-4xl font-light tracking-tighter mb-4 uppercase reveal">
          {t('news_title')} <span className="font-bold text-brand-gold">LEVEL</span>
        </h2>
        <p className="text-zinc-500 font-light mb-10 reveal" style={{ transitionDelay: '200ms' }}>{t('news_desc')}</p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto reveal" style={{ transitionDelay: '400ms' }} onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder={t('news_placeholder')} className="flex-grow bg-[#0d0d0d] border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-brand-gold transition-all font-light" required />
          <button className="bg-brand-gold hover:brightness-110 text-black px-12 py-4 font-black text-[10px] tracking-widest transition-all gold-glow uppercase">
            {t('news_btn')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
