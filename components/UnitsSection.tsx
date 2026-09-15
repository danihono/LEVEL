
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { units, mapsUrl, whatsappUrl, type Unit } from '../lib/units';
import WhatsAppIcon from './WhatsAppIcon';

// Card de unidade: mostra a fachada parada e, ao passar o mouse, troca para as
// demais fotos (tatame/interior) em loop com crossfade. Funciona com qualquer
// quantidade de fotos — basta adicionar caminhos no array `photos` da unidade.
const UnitCard: React.FC<{ unit: Unit; idx: number }> = ({ unit, idx }) => {
  const { t } = useLanguage();
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
    <div
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
      {/* Link do Maps cobrindo o card inteiro — o botão de WhatsApp fica acima dele. */}
      <a
        href={mapsUrl(unit.address)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${unit.name} — ${t('map_open_maps')}`}
        className="absolute inset-0 z-10"
      ></a>
      <div className="absolute bottom-0 left-0 p-10 text-white w-full pointer-events-none z-20">
        <p className="text-[9px] font-black tracking-[0.4em] text-brand-gold mb-3">{unit.city}</p>
        <h4 className="text-2xl font-bold tracking-tight">{unit.name}</h4>
        <div className="mt-2 flex items-start justify-between gap-4">
          <p className="text-xs font-light leading-relaxed text-zinc-300">{unit.address}</p>
          <a
            href={whatsappUrl(unit.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t('unit_whatsapp')} — ${unit.name}`}
            title={`${t('unit_whatsapp')} — ${unit.name}`}
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto relative z-30 flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-[#25D366] shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300"
          >
            <WhatsAppIcon className="w-5 h-5 text-white" />
          </a>
        </div>
        <div className="mt-6 h-[1.5px] w-0 group-hover:w-full bg-brand-gold transition-all duration-500"></div>
      </div>
    </div>
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
