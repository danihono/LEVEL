
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const STORE_URL = 'https://montink.com/level-jiu-jitsu-store/';

type Product = { name: string; img: string; price?: string; zoom?: boolean; filiais?: boolean };

const products: Product[] = [
  // Camiseta — venda online (Montink)
  { name: 'Camiseta', price: 'R$ 89,90', img: '/images/camisa.png' },
  // Rashguard — venda apenas nas filiais
  { name: 'Rashguard', img: '/images/rashguard.png', zoom: true, filiais: true },
];

const kimonoVariants = [
  { key: 'branco', img: '/images/kimonobranco.png', dot: 'bg-white' },
  { key: 'azul',   img: '/images/kimonoazul.png',   dot: 'bg-blue-700' },
  { key: 'preto',  img: '/images/kimonopreto.png',  dot: 'bg-zinc-900 border border-white/40' },
];

const KimonoCard: React.FC = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  return (
    <div className="group reveal block">
      <div className="relative aspect-[3/4] bg-zinc-950 overflow-hidden mb-8 border border-white/5">
        {/* colorido sempre, sem grayscale; cover deslocado p/ centralizar o kimono */}
        <img
          src={kimonoVariants[active].img}
          alt="LEVEL GI PRO SERIES"
          className="w-full h-full object-cover object-[78%_center] transition-all duration-700 group-hover:scale-105"
        />

        {/* bolinhas: aparecem no hover, embaixo da foto */}
        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {kimonoVariants.map((v, i) => (
            <button
              key={v.key}
              type="button"
              aria-label={v.key}
              onClick={(e) => { e.stopPropagation(); setActive(i); }}
              className={`w-4 h-4 rounded-full ${v.dot} transition-transform ${
                active === i ? 'ring-2 ring-brand-gold ring-offset-2 ring-offset-black scale-110' : 'hover:scale-110'
              }`}
            />
          ))}
        </div>
      </div>
      <h4 className="text-lg font-bold tracking-tight mb-2 text-white">Kimono</h4>
      <p className="text-brand-gold font-bold tracking-[0.2em] text-[11px] uppercase">{t('store_filiais')}</p>
    </div>
  );
};

const StoreSection: React.FC = () => {
  const { t } = useLanguage();

  const renderProduct = (product: Product, idx: number) => {
    const inner = (
      <>
        <div className="relative aspect-[3/4] bg-zinc-950 overflow-hidden mb-8 border border-white/5">
          <img src={product.img} alt={product.name} className={`w-full h-full object-cover grayscale brightness-[0.6] transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100 ${product.zoom ? 'scale-150 group-hover:scale-[1.6]' : 'group-hover:scale-105'}`} />
          {!product.filiais && (
            <span className="absolute bottom-0 left-0 w-full bg-brand-gold text-black py-6 font-black text-[10px] tracking-[0.4em] translate-y-full group-hover:translate-y-0 transition-transform duration-500 uppercase text-center">
              {t('store_buy')}
            </span>
          )}
        </div>
        <h4 className="text-lg font-bold tracking-tight mb-2 text-white">{product.name}</h4>
        {product.filiais ? (
          <p className="text-brand-gold font-bold tracking-[0.2em] text-[11px] uppercase">{t('store_filiais')}</p>
        ) : (
          <p className="text-brand-gold font-bold tracking-[0.2em] text-sm">{product.price}</p>
        )}
      </>
    );
    return product.filiais ? (
      <div key={idx} className="group reveal block" style={{ transitionDelay: `${idx * 150}ms` }}>
        {inner}
      </div>
    ) : (
      <a
        key={idx}
        href={STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group cursor-pointer reveal block"
        style={{ transitionDelay: `${idx * 150}ms` }}
      >
        {inner}
      </a>
    );
  };

  return (
    <section id="store" className="bg-transparent py-32 px-4 md:px-0">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-24 reveal">
          <span className="text-brand-gold font-black tracking-[0.6em] text-[10px] uppercase block mb-4">LIFESTYLE & GEAR</span>
          <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-white uppercase">{t('store_title')} <span className="font-bold">{t('store_span')}</span></h2>
          <div className="mt-10 w-24 h-[1.5px] bg-brand-gold mx-auto drop-shadow-[0_0_8px_rgba(197,160,40,0.4)]"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Camiseta (online) | Kimono (filiais) | Rashguard (filiais) */}
          {renderProduct(products[0], 0)}
          <KimonoCard />
          {renderProduct(products[1], 1)}
        </div>
        <div className="mt-24 text-center reveal">
          <a
            href={STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-brand-gold/30 px-16 py-5 font-black text-[10px] tracking-[0.4em] text-white hover:bg-brand-gold hover:text-black transition-all uppercase"
          >
            {t('store_explore')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default StoreSection;
