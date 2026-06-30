
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { units, mapsUrl, type Unit } from '../lib/units';

// Card de unidade: mostra a fachada parada e, ao passar o mouse, troca para as
// demais fotos (tatame/interior) em loop com crossfade. Funciona com qualquer
// quantidade de fotos — basta adicionar caminhos no array `photos` da unidade.
const UnitCard: React.FC<{ unit: Unit; idx: number }> = ({ unit, idx }) => {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<number | null>(null);

  const stopCycle = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleEnter = () => {
    setHovered(true);
    if (unit.photos.length > 1) {
      setPhotoIdx(1); // troca imediata para a próxima foto (tatame)
      stopCycle();
      timerRef.current = window.setInterval(() => {
        setPhotoIdx((i) => (i + 1) % unit.photos.length);
      }, 1800);
    }
  };

  const handleLeave = () => {
    setHovered(false);
    stopCycle();
    setPhotoIdx(0);
  };

  useEffect(() => stopCycle, []);

  return (
    <a
      href={mapsUrl(unit.address)}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative block h-[500px] overflow-hidden reveal border border-white/5"
      style={{ transitionDelay: `${idx * 100}ms` }}
    >
      {unit.photos.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${unit.name} — ${i === 0 ? 'fachada' : 'tatame'}`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            hovered ? 'grayscale-0 brightness-100' : 'grayscale brightness-[0.6]'
          }`}
          style={{ opacity: photoIdx === i ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 p-10 text-white w-full pointer-events-none">
        <p className="text-[9px] font-black tracking-[0.4em] text-brand-gold mb-3">{unit.city}</p>
        <h4 className="text-2xl font-bold tracking-tight">{unit.name}</h4>
        <p className="mt-2 text-xs font-light leading-relaxed text-zinc-300">{unit.address}</p>
        <div className="mt-6 h-[1.5px] w-0 group-hover:w-full bg-brand-gold transition-all duration-500"></div>
      </div>
    </a>
  );
};

const UnitsSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="escolas" className="bg-transparent py-32 px-4 md:px-0">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 reveal">
          <div>
            <span className="text-brand-gold font-black tracking-[0.5em] text-[10px] uppercase mb-4 block">{t('units_presence')}</span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white uppercase">{t('units_title')} <span className="font-bold">{t('units_span')}</span></h2>
          </div>
          <a
            href="#localizador"
            className="mt-8 md:mt-0 border-b-2 border-brand-gold pb-2 text-[10px] font-black tracking-[0.3em] hover:brightness-125 transition-all uppercase text-brand-gold"
          >
            {t('units_btn_all')}
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {units.map((unit, idx) => (
            <UnitCard key={unit.id} unit={unit} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnitsSection;
