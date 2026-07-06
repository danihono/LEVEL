import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { isoToBr } from '../lib/blackBelts';
import { usePublicBelts } from '../hooks/usePublicBelts';
import Logo from './Logo';
import RankedAvatar from './RankedAvatar';

const BlackBeltsPage: React.FC = () => {
  const { t } = useLanguage();
  const baseUrl = import.meta.env.BASE_URL;
  const bgImage = `${baseUrl}images/tres.png`;
  const { activeBelts, leaderId } = usePublicBelts(t('bb_rank_name'));
  const pageRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  React.useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.08 },
    );
    root.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeBelts]);

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen overflow-hidden bg-[#070707] text-white selection:bg-[#C5A028] selection:text-black"
    >
      <div
        className="fixed inset-0 bg-cover bg-center grayscale-[0.18] brightness-[0.28] contrast-[1.08] opacity-80"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/85 via-[#080808]/94 to-black" />
      <div className="fixed inset-0 bg-gradient-to-br from-[#C5A028]/10 via-transparent to-black/20" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 md:px-10 lg:px-14">
        <header className="flex items-center justify-between gap-4">
          <a href="#" className="block h-14 w-[112px] md:h-16 md:w-[140px]" aria-label="LEVEL Jiu Jitsu">
            <Logo
              variant="light"
              className="h-full w-full"
              showText={true}
              useRealLogo={true}
              realLogoSrc="images/logo3.png"
              realLogoImgClassName="object-contain"
            />
          </a>

          <a
            href="#team"
            className="bb-btn inline-flex items-center justify-center rounded-full px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white/85 transition-colors hover:text-white md:px-6"
          >
            {t('bb_page_back')}
          </a>
        </header>

        <section className="pt-14 md:pt-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.55fr)] lg:items-end">
            <div>
              <div className="bb-pill reveal inline-flex items-center gap-3 rounded-full px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-brand-gold" />
                <span className="text-xs uppercase tracking-[0.22em] text-white/80">{t('bb_kicker')}</span>
              </div>

              <h1
                className="reveal mt-5 max-w-4xl text-4xl font-extrabold leading-[1.02] md:text-6xl lg:text-7xl"
                style={{ transitionDelay: '100ms' }}
              >
                {t('bb_page_title_prefix')}{' '}
                <span className="text-brand-gold">{t('bb_page_title_gold')}</span>
              </h1>

              <p
                className="reveal mt-6 max-w-2xl text-base leading-relaxed text-white/68 md:text-lg"
                style={{ transitionDelay: '180ms' }}
              >
                {t('bb_page_desc')}
              </p>
            </div>

            <div
              className="reveal grid grid-cols-2 gap-3 lg:max-w-sm lg:justify-self-end"
              style={{ transitionDelay: '260ms' }}
            >
              <div className="rounded-2xl border border-[#C5A028]/18 bg-black/35 px-5 py-5 backdrop-blur-xl">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                  {t('bb_page_total_label')}
                </div>
                <div className="mt-3 text-4xl font-black text-brand-gold">{activeBelts.length}</div>
              </div>
              <div className="rounded-2xl border border-[#C5A028]/18 bg-black/35 px-5 py-5 backdrop-blur-xl">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                  {t('bb_page_order_label')}
                </div>
                <div className="mt-3 text-xl font-black uppercase leading-tight text-white/90">
                  {t('bb_ranking_title')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 pt-12 md:pt-16">
          {activeBelts.length === 0 ? (
            <div className="reveal rounded-2xl border border-[#C5A028]/16 bg-black/35 px-6 py-16 text-center text-white/60 backdrop-blur-xl">
              {t('bb_page_empty')}
            </div>
          ) : (
            <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {activeBelts.map((belt, idx) => {
                const isLeader = belt.id === leaderId;
                const beltDate = isoToBr(belt.blackBeltDate);

                return (
                  <li
                    key={belt.id}
                    className="reveal"
                    style={{ transitionDelay: `${Math.min(idx, 8) * 70}ms` }}
                  >
                    <article
                      className={[
                        'group relative h-full overflow-hidden rounded-2xl border bg-black/38 p-6 backdrop-blur-xl',
                        'transition-[transform,border-color,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-black/48',
                        isLeader
                          ? 'border-[#F1D592]/42 shadow-[0_0_55px_rgba(197,160,40,0.14)]'
                          : 'border-[#C5A028]/16 hover:border-[#F1D592]/30',
                      ].join(' ')}
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#C5A028]/12 to-transparent opacity-80" />
                      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-[#C5A028]/12" />

                      <div className="relative flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">
                            {t('bb_ranking_title')}
                          </div>
                          <div className="mt-1 text-5xl font-black leading-none text-brand-gold">#{idx + 1}</div>
                        </div>

                        {isLeader && (
                          <span className="shrink-0 rounded-full border border-[#C5A028]/30 bg-black/45 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white/80">
                            {t('bb_ranking_top')}
                          </span>
                        )}
                      </div>

                      <div className="relative mt-8 flex flex-col items-center text-center">
                        <RankedAvatar
                          name={belt.name}
                          photoUrl={belt.photoUrl || undefined}
                          sizeClass="h-28 w-28 text-3xl md:h-32 md:w-32 shadow-[0_18px_48px_rgba(0,0,0,0.42)]"
                        />

                        <h2 className="mt-6 max-w-full break-words text-2xl font-black leading-tight text-white md:text-3xl">
                          {belt.name}
                        </h2>
                        <p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-brand-gold">
                          {t('bb_page_card_rank')}
                        </p>

                        <div className="mt-5 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/62">
                          {beltDate ? `${t('bb_page_since')} ${beltDate}` : t('bb_page_date_missing')}
                        </div>
                      </div>

                      <div className="relative mt-8">
                        <div className="bb-belt h-3" />
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          )}
        </section>
      </div>
    </main>
  );
};

export default BlackBeltsPage;
