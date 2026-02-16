
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const founders = [
  { 
    name: 'GRAND MASTER CARLOS', 
    age: '62', 
    rank: 'RED BELT 9º DEGREE', 
    bio: 'Pioneiro da metodologia LEVEL, dedicou 40 anos ao aperfeiçoamento técnico e filosófico do esporte.', 
    img: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    name: 'MASTER RENAN', 
    age: '48', 
    rank: 'BLACK BELT 6º DEGREE', 
    bio: 'Responsável pela expansão internacional da LEVEL e pelo sistema de treinamento de alta performance.', 
    img: 'https://images.unsplash.com/photo-1509564324749-4728d13dfb3a?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    name: 'MASTER FABIO', 
    age: '42', 
    rank: 'BLACK BELT 5º DEGREE', 
    bio: 'Estrategista chefe, focado na união entre o Jiu Jitsu tradicional e as necessidades da vida moderna.', 
    img: 'https://images.unsplash.com/photo-1517438476312-10d79c67750d?q=80&w=800&auto=format&fit=crop' 
  },
];

const MainCards: React.FC = () => {
  const { t } = useLanguage();
  
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
            >
              <div className="relative w-full h-[600px] perspective-1000 mb-8">
                <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 backface-hidden rounded-sm overflow-hidden border border-white/5 shadow-2xl bg-[#0a0a0a]">
                    <img 
                      src={founder.img} 
                      alt={founder.name}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110 grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute top-8 left-8">
                      <div className="w-1.5 h-12 bg-brand-gold shadow-[0_0_15px_rgba(197,160,40,0.5)]"></div>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0d0d0d] border border-brand-gold/20 p-12 flex flex-col justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                    <div className="relative z-10">
                      <h4 className="text-brand-gold font-black text-sm tracking-[0.3em] mb-8 uppercase">
                        {founder.name}
                      </h4>
                      <div className="space-y-6">
                        <div>
                          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1">{t('founder_age')}</p>
                          <p className="text-white text-lg font-light tracking-wide">{founder.age} anos</p>
                        </div>
                        <div>
                          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1">{t('founder_rank')}</p>
                          <p className="text-white text-lg font-bold tracking-tight text-brand-gold">{founder.rank}</p>
                        </div>
                        <div className="pt-6 border-t border-white/5">
                          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-3">{t('founder_bio')}</p>
                          <p className="text-zinc-400 text-sm font-light leading-relaxed italic">
                            "{founder.bio}"
                          </p>
                        </div>
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
