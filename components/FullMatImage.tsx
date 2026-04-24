
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const FullMatImage: React.FC = () => {
  const { t } = useLanguage();
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="relative h-[700px] w-full overflow-hidden">
      <img
        src={`${baseUrl}images/sol.png`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute inset-0 flex items-center justify-start px-8 md:px-16 lg:px-24 reveal">
        <div className="max-w-4xl text-left md:max-w-3xl lg:max-w-4xl">
          <span className="mb-6 block text-[11px] font-black tracking-[0.32em] text-brand-gold">
            {t('philosophy_title')}
          </span>
          <h2 className="max-w-3xl text-white text-3xl md:text-6xl lg:text-[4.4rem] font-light tracking-[-0.04em] leading-[1.02]">
            {t('philosophy_message')}
          </h2>
          <div className="mt-10 h-[2px] w-24 bg-brand-gold shadow-[0_0_20px_#C5A028]"></div>
        </div>
      </div>
    </section>
  );
};

export default FullMatImage;
