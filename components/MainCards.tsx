import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const baseUrl = import.meta.env.BASE_URL;

const founders = [
  {
    name: 'GRAND MASTER CARLOS',
    age: '62',
    rank: 'RED BELT 9º DEGREE',
    units: 'LEVEL MATRIZ (SÃO PAULO), LEVEL PINHEIROS',
    img: `${baseUrl}images/fundador1.png`,
  },
  {
    name: 'MASTER RICARDO SALDANHA',
    age: '48',
    rank: 'BLACK BELT 6º DEGREE',
    units: 'LEVEL IPANEMA (RIO), LEVEL BRICKELL (MIAMI)',
    img: `${baseUrl}images/fundador2.png`,
  },
  {
    name: 'MASTER FABIO',
    age: '42',
    rank: 'BLACK BELT 5º DEGREE',
    units: 'LEVEL ALVALADE (LISBOA), LEVEL MADRID',
    img: `${baseUrl}images/fundador3.png`,
  },
];

const MainCards: React.FC = () => {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 md:px-0 bg-transparent">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20 reveal">
          <span className="text-brand-gold font-black tracking-[0.5em] text-[10px] uppercase block mb-4">
            {t('founders_subtitle')}
          </span>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white uppercase">
            {t('founders_title')}
          </h2>
          <div className="mt-8 w-20 h-[1px] bg-brand-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {founders.map((founder, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center reveal"
              style={{ transitionDelay: `${idx * 150}ms` }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative w-full h-[600px] perspective-1000 mb-8">
                <div
                  className="relative w-full h-full transition-transform duration-700 preserve-3d"
                  style={{ transform: hoveredCard === idx ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  <div className="absolute inset-0 backface-hidden rounded-sm overflow-hidden border border-white/5 shadow-2xl bg-[#0a0a0a]">
                    <img
                      src={founder.img}
                      alt={founder.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute top-8 left-8">
                      <div className="w-1.5 h-12 bg-brand-gold shadow-[0_0_15px_rgba(197,160,40,0.5)]"></div>
                    </div>
                  </div>

                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0d0d0d] border border-brand-gold/20 p-12 flex flex-col justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                    <div className="relative z-10 space-y-6">
                      <div>
                        <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1">Nome</p>
                        <p className="text-brand-gold font-black text-sm tracking-[0.2em] uppercase">{founder.name}</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1">{t('founder_age')}</p>
                        <p className="text-white text-lg font-light tracking-wide">{founder.age} anos</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1">{t('founder_rank')}</p>
                        <p className="text-white text-lg font-bold tracking-tight text-brand-gold">{founder.rank}</p>
                      </div>
                      <div className="pt-4 border-t border-white/5">
                        <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-2">Unidades</p>
                        <p className="text-zinc-300 text-sm font-light leading-relaxed uppercase">{founder.units}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold tracking-tighter text-white uppercase group-hover:text-brand-gold transition-colors duration-500">
                {founder.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainCards;

