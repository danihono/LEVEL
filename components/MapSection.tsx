
import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { units, mapsUrl } from '../lib/units';

const mapPoints = [
  { id: 'campinas', top: '74%', left: '32.8%', label: 'Campinas - SP' },
  { id: 'jaguariuna', top: '72.8%', left: '33.3%', label: 'Jaguariúna - SP' },
];

const MapSection: React.FC = () => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const term = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!term) return units;
    return units.filter((u) =>
      `${u.city} ${u.name} ${u.address}`.toLowerCase().includes(term)
    );
  }, [term]);

  const showResults = submitted || term.length > 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="localizador" className="bg-transparent py-32 px-4 md:px-0 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <div className="w-full lg:w-1/3 reveal">
          <span className="text-brand-gold font-black tracking-[0.4em] text-[10px] uppercase block mb-4">{t('map_locator')}</span>
          <h2 className="text-5xl font-light mb-8 tracking-tighter text-white leading-none uppercase">{t('map_vibe')} <span className="font-bold">LEVEL</span></h2>
          <p className="text-zinc-500 font-light mb-12 leading-relaxed text-lg">{t('map_desc')}</p>
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('map_placeholder')}
              className="w-full bg-[#0d0d0d] border border-white/10 px-8 py-6 outline-none focus:border-brand-gold transition-all text-white font-light text-sm tracking-widest placeholder:text-zinc-800"
            />
            <button
              type="submit"
              className="absolute right-3 top-3 bottom-3 bg-brand-gold text-black px-10 font-black text-[9px] tracking-[0.3em] uppercase hover:brightness-110 transition-all gold-glow"
            >
              {t('map_btn_search')}
            </button>
          </form>

          {showResults && (
            <div className="mt-6 flex flex-col gap-3">
              {results.length === 0 ? (
                <p className="text-zinc-500 font-light text-sm py-4">{t('map_no_results')}</p>
              ) : (
                results.map((u) => (
                  <a
                    key={u.id}
                    href={mapsUrl(u.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[#0d0d0d] border border-white/10 hover:border-brand-gold transition-colors p-5 group/result"
                  >
                    <p className="text-[8px] font-black tracking-[0.4em] text-brand-gold mb-2">{u.city}</p>
                    <h4 className="text-white font-bold text-sm tracking-tight">{u.name}</h4>
                    <p className="text-zinc-400 font-light text-xs mt-1 leading-relaxed">{u.address}</p>
                    <span className="inline-block mt-3 text-[9px] font-black tracking-[0.25em] uppercase text-brand-gold group-hover/result:brightness-125">
                      {t('map_open_maps')} →
                    </span>
                  </a>
                ))
              )}
            </div>
          )}
        </div>
        <div className="w-full lg:w-2/3 h-[600px] bg-black relative overflow-hidden reveal border border-white/5">
          <div className="absolute inset-0 opacity-30 brightness-[0.4]" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop")', backgroundSize: 'cover', filter: 'grayscale(1) contrast(1.4)' }}></div>
          {mapPoints.map((point) => (
            <div
              key={point.id}
              className="absolute group"
              style={{ top: point.top, left: point.left, transform: 'translate(-50%, -50%)' }}
            >
              <div className="w-5 h-5 bg-brand-gold rounded-full border-4 border-black animate-pulse shadow-[0_0_25px_#C5A028]"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-7 px-2 py-1 text-[9px] uppercase tracking-wider bg-black/85 text-brand-gold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                {point.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapSection;
