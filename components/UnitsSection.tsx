
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

// Unidades reais da Level. As imagens abaixo são placeholders neutros —
// substituir pelas fotos de fachada/tatame de cada unidade quando recebidas.
const units = [
  { city: 'CAMPINAS', name: 'LEVEL MATRIZ', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop' },
  { city: 'CAMPINAS - CAMBUÍ', name: 'LEVEL CAMBUÍ', img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop' },
  { city: 'JAGUARIÚNA', name: 'LEVEL JAGUARIÚNA', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop' },
];

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
          <button className="mt-8 md:mt-0 border-b-2 border-brand-gold pb-2 text-[10px] font-black tracking-[0.3em] hover:brightness-125 transition-all uppercase text-brand-gold">
            {t('units_btn_all')}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit, idx) => (
            <div key={idx} className="group relative h-[500px] overflow-hidden reveal border border-white/5" style={{ transitionDelay: `${idx * 100}ms` }}>
              <img src={unit.img} alt={unit.name} className="w-full h-full object-cover grayscale brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-10 text-white w-full">
                <p className="text-[9px] font-black tracking-[0.4em] text-brand-gold mb-3">{unit.city}</p>
                <h4 className="text-2xl font-bold tracking-tight">{unit.name}</h4>
                <div className="mt-6 h-[1.5px] w-0 group-hover:w-full bg-brand-gold transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnitsSection;
