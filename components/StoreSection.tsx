
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const products = [
  { name: 'GI PRO SERIES - WHITE', price: 'R$ 890,00', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop' },
  { name: 'LEVEL TRAINING RASHGUARD', price: 'R$ 240,00', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyu0RXeqz7tmrwp-sJ-x_r8ZIJMV88fBb_GA&s' },
  { name: 'LIFESTYLE HOODIE BLACK', price: 'R$ 380,00', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop' },
];

const StoreSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="store" className="bg-transparent py-32 px-4 md:px-0">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-24 reveal">
          <span className="text-brand-gold font-black tracking-[0.6em] text-[10px] uppercase block mb-4">LIFESTYLE & GEAR</span>
          <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-white uppercase">{t('store_title')} <span className="font-bold">{t('store_span')}</span></h2>
          <div className="mt-10 w-24 h-[1.5px] bg-brand-gold mx-auto drop-shadow-[0_0_8px_rgba(197,160,40,0.4)]"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {products.map((product, idx) => (
            <div key={idx} className="group cursor-pointer reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
              <div className="relative aspect-[3/4] bg-zinc-950 overflow-hidden mb-8 border border-white/5">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover grayscale brightness-[0.6] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100" />
                <button className="absolute bottom-0 left-0 w-full bg-brand-gold text-black py-6 font-black text-[10px] tracking-[0.4em] translate-y-full group-hover:translate-y-0 transition-transform duration-500 uppercase">
                  {t('store_buy')}
                </button>
              </div>
              <h4 className="text-lg font-bold tracking-tight mb-2 text-white">{product.name}</h4>
              <p className="text-brand-gold font-bold tracking-[0.2em] text-sm">{product.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-24 text-center reveal">
          <button className="border border-brand-gold/30 px-16 py-5 font-black text-[10px] tracking-[0.4em] text-white hover:bg-brand-gold hover:text-black transition-all uppercase">
            {t('store_explore')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default StoreSection;
