import React from 'react';
import { useLanguage } from '../context/LanguageContext';

type RankedItem = {
  rank: number;
  name: string;
  subtitle: string;
  photoUrl?: string;
};

const RankedAvatar: React.FC<{ name: string; photoUrl?: string }> = ({ name, photoUrl }) => {
  const [failed, setFailed] = React.useState(false);

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
    return (first + last).toUpperCase();
  };

  return (
    <div className="relative w-12 h-12 rounded-full border border-[#C5A028]/25 bg-black/35 overflow-hidden shrink-0">
      {photoUrl && !failed ? (
        <img
          src={photoUrl}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="w-full h-full grid place-items-center font-black tracking-[0.12em] text-white/85">
          {getInitials(name)}
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/40"></div>
    </div>
  );
};

const BlackBeltsShowcase: React.FC = () => {
  const { t } = useLanguage();
  const baseUrl = import.meta.env.BASE_URL;
  const bgImage = `${baseUrl}images/team.png`;

  const ranked: RankedItem[] = Array.from({ length: 6 }, (_, i) => {
    const rank = i + 1;
    const photoUrl =
      rank === 1
        ? `${baseUrl}images/fundador1.png`
        : rank === 2
          ? `${baseUrl}images/fundador2.png`
          : rank === 3
            ? `${baseUrl}images/fundador3.png`
            : undefined;

    return {
      rank,
      name: `${t('bb_rank_name')} ${rank}`,
      subtitle: t('bb_rank_sub'),
      photoUrl,
    };
  });

  return (
    <section id="team" className="relative min-h-screen w-full flex items-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[30s] scale-105 grayscale-[0.18] brightness-[0.42] contrast-[1.05] opacity-95"
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        <div className="absolute inset-0 bg-black/22"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-3 bb-pill rounded-full px-4 py-2 reveal">
              <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
              <span className="text-xs md:text-sm tracking-[0.18em] uppercase text-white/80">{t('bb_kicker')}</span>
            </div>

            <h2 className="mt-4 text-4xl md:text-6xl font-extrabold leading-[1.05] reveal" style={{ transitionDelay: '120ms' }}>
              {t('bb_title_prefix')} <span className="text-brand-gold">{t('bb_title_gold')}</span>
            </h2>

            <p className="mt-5 text-white/70 text-base md:text-lg max-w-xl reveal" style={{ transitionDelay: '220ms' }}>
              {t('bb_desc')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="reveal" style={{ transitionDelay: '300ms' }}>
                <div className="rounded-2xl border border-[#C5A028]/20 bg-black/35 backdrop-blur-xl px-5 py-4">
                  <div className="text-[10px] md:text-xs tracking-[0.18em] uppercase text-white/60">{t('bb_total_label')}</div>
                  <div className="mt-2 text-3xl md:text-4xl font-extrabold text-brand-gold">{t('bb_total_value')}</div>
                </div>
              </div>
              <div className="reveal" style={{ transitionDelay: '380ms' }}>
                <div className="rounded-2xl border border-[#C5A028]/20 bg-black/35 backdrop-blur-xl px-5 py-4">
                  <div className="text-[10px] md:text-xs tracking-[0.18em] uppercase text-white/60">{t('bb_activity_label')}</div>
                  <div className="mt-2 text-3xl md:text-4xl font-extrabold">{t('bb_activity_value')}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4">
              <div className="text-white/65 text-sm reveal" style={{ transitionDelay: '460ms' }}>
                {t('bb_hint')}
              </div>
              <a
                href="#contato"
                className="bb-btn inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm md:text-base font-semibold gold-glow reveal w-fit"
                style={{ transitionDelay: '520ms' }}
              >
                {t('bb_cta')}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-[#C5A028]/18 bg-black/25 backdrop-blur-xl p-6 md:p-7">
              <div className="flex items-center justify-between reveal" style={{ transitionDelay: '220ms' }}>
                <div className="text-xs tracking-[0.18em] uppercase text-white/70">{t('bb_ranking_title')}</div>
                <div className="text-[10px] tracking-[0.18em] uppercase text-white/45">TOP 6</div>
              </div>

              <ol className="mt-5 flex flex-col">
                {ranked.map((item, idx) => {
                  const isTop = item.rank === 1;
                  return (
                    <li
                      key={item.rank}
                      className={[
                        'group relative flex items-center gap-5 rounded-2xl border bg-black/20 px-5 py-4 md:px-6 md:py-5',
                        isTop ? 'border-[#F1D592]/35 shadow-[0_0_45px_rgba(197,160,40,0.10)]' : 'border-[#C5A028]/16',
                        idx === 0 ? '' : 'mt-3',
                        'hover:border-[#F1D592]/28 hover:bg-black/28 transition-[border-color,background-color] duration-300',
                        'reveal',
                      ].join(' ')}
                      style={{ transitionDelay: `${260 + idx * 90}ms` }}
                    >
                      <div className="min-w-[104px] flex flex-col justify-center">
                        <div
                          className={[
                            'font-black tracking-tight leading-none',
                            isTop ? 'text-4xl md:text-5xl text-brand-gold' : 'text-3xl md:text-4xl text-white/80',
                          ].join(' ')}
                        >
                          #{item.rank}
                        </div>
                        {isTop && (
                          <span className="mt-2 hidden sm:inline-flex w-fit items-center rounded-full border border-[#C5A028]/25 bg-black/35 px-3 py-1 text-[10px] tracking-[0.18em] uppercase text-white/75">
                            {t('bb_ranking_top')}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-4 min-w-0">
                          <RankedAvatar name={item.name} photoUrl={item.photoUrl} />

                          <div className="min-w-0">
                            <div className="text-base md:text-lg font-bold truncate">{item.name}</div>
                            <div className="text-sm text-white/65 mt-0.5">{item.subtitle}</div>
                          </div>
                        </div>
                        <div className="mt-3 bb-belt"></div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};

export default BlackBeltsShowcase;
