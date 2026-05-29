import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const baseUrl = import.meta.env.BASE_URL;

// Calcula a idade a partir da data de nascimento (ISO: AAAA-MM-DD),
// assim o número nunca fica desatualizado com o passar dos anos.
const calcAge = (birthIso: string): number => {
  const birth = new Date(birthIso);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
};

const founders = [
  {
    name: 'ADRIANO RIBEIRO PIRES',
    birth: '1977-08-25',
    beltSince: '2001',
    role: 'Fundador da Level e principal líder da equipe, responsável pela parte técnica.',
    img: `${baseUrl}images/adriano.jpg`,
  },
  {
    name: 'RICARDO MOREIRA SALDANHA',
    birth: '1976-10-10',
    beltSince: '2005',
    role: 'Idealizador e fundador da Level Jiu Jitsu.',
    img: `${baseUrl}images/ricardo.jpg`,
  },
];

const methodologist = {
  name: 'ALBA IARA CAE RODRIGUES',
  birth: '1986-07-25',
  beltSince: '2025',
  bio: 'Formada em Educação Física pela UFSCar e UniFAJ, Mestre em Educação Física pela Unicamp e Ph.D. em Educação com ênfase em Educação Física pela George Mason University. Especialista em formação profissional de treinadores e no desenvolvimento de métodos e currículos pedagógicos para atividades de combate. Responsável pela metodologia da Level.',
  img: `${baseUrl}images/alba.jpg`,
};

const MainCards: React.FC = () => {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredMethodologist, setHoveredMethodologist] = useState(false);

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
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
                      className="absolute inset-0 w-full h-full object-cover object-[center_20%] scale-110 transition-transform duration-700 group-hover:scale-[1.18]"
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
                        <p className="text-white text-lg font-light tracking-wide">{calcAge(founder.birth)} anos</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1">Faixa Preta desde</p>
                        <p className="text-brand-gold text-lg font-bold tracking-tight">{founder.beltSince}</p>
                      </div>
                      <div className="pt-4 border-t border-white/5">
                        <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-2">Função</p>
                        <p className="text-zinc-300 text-sm font-light leading-relaxed">{founder.role}</p>
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

        {/* Metodologista */}
        <div className="mt-20 flex flex-col items-center">
          <div className="w-12 h-[1px] bg-white/15 mx-auto mb-14"></div>
          <span className="text-white/30 font-black tracking-[0.5em] text-[9px] uppercase block mb-12">
            Metodologista
          </span>
          <div className="w-full max-w-sm">
            <div
              className="group flex flex-col items-center"
              onMouseEnter={() => setHoveredMethodologist(true)}
              onMouseLeave={() => setHoveredMethodologist(false)}
            >
              <div className="relative w-full h-[600px] perspective-1000 mb-8">
                <div
                  className="relative w-full h-full transition-transform duration-700 preserve-3d"
                  style={{ transform: hoveredMethodologist ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  <div className="absolute inset-0 backface-hidden rounded-sm overflow-hidden border border-white/5 shadow-2xl bg-[#0a0a0a]">
                    <img
                      src={methodologist.img}
                      alt={methodologist.name}
                      className="absolute inset-0 w-full h-full object-cover object-[center_20%] scale-110 transition-transform duration-700 group-hover:scale-[1.18]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute top-8 left-8">
                      <div className="w-1.5 h-12 bg-brand-gold shadow-[0_0_15px_rgba(197,160,40,0.5)]"></div>
                    </div>
                  </div>

                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0d0d0d] border border-brand-gold/20 p-8 flex flex-col justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                    <div className="relative z-10 space-y-4">
                      <div>
                        <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1">Nome</p>
                        <p className="text-brand-gold font-black text-sm tracking-[0.15em] uppercase">{methodologist.name}</p>
                      </div>
                      <div className="flex gap-8">
                        <div>
                          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1">{t('founder_age')}</p>
                          <p className="text-white text-base font-light tracking-wide">{calcAge(methodologist.birth)} anos</p>
                        </div>
                        <div>
                          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1">Faixa Preta desde</p>
                          <p className="text-brand-gold text-base font-bold tracking-tight">{methodologist.beltSince}</p>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-white/5">
                        <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-2">Função</p>
                        <p className="text-zinc-300 text-xs font-light leading-relaxed">{methodologist.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold tracking-tighter text-white uppercase group-hover:text-brand-gold transition-colors duration-500">
                {methodologist.name}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCards;

