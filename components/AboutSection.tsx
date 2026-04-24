import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

type SceneKey = 'culture' | 'mission' | 'base' | 'values';

const SceneIcon: React.FC<{ scene: SceneKey; className?: string }> = ({ scene, className = 'h-5 w-5' }) => {
  const sharedProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (scene === 'culture') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path {...sharedProps} d="M12 3.5 13.7 8l4.8.2-3.8 3 1.3 4.8L12 13.7 8 16l1.3-4.8-3.8-3L10.3 8 12 3.5Z" />
      </svg>
    );
  }

  if (scene === 'mission') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <circle {...sharedProps} cx="12" cy="12" r="7.5" />
        <circle {...sharedProps} cx="12" cy="12" r="2.5" />
        <path {...sharedProps} d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3" />
      </svg>
    );
  }

  if (scene === 'base') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path {...sharedProps} d="M4 19.2h16M6.2 19.2V9.4M12 19.2V6.4M17.8 19.2v-7.1" />
        <path {...sharedProps} d="M4.8 9.4h2.8M10.6 6.4h2.8M16.4 12.1h2.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...sharedProps} d="M12 3.2 14.3 5.5l3.2-.2.2 3.2L20 10.8l-2.2 2.2.2 3.2-3.2.2L12 18.8l-2.8-2.4-3.2.2.2-3.2L4 10.8l2.2-2.3-.2-3.2 3.2.2L12 3.2Z" />
      <path {...sharedProps} d="m9.7 12 1.6 1.7 3.2-3.6" />
    </svg>
  );
};

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m9.5 5 7 7-7 7" />
  </svg>
);

const initialImageErrors: Record<SceneKey, boolean> = {
  culture: false,
  mission: false,
  base: false,
  values: false,
};

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeScene, setActiveScene] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<SceneKey, boolean>>(initialImageErrors);
  const baseUrl = import.meta.env.BASE_URL;
  const fallbackImage = `${baseUrl}images/team.png`;

  const scenes: Array<{
    key: SceneKey;
    cardTitle: string;
    headline: string;
    supportLine: string;
    description: string;
    detailLabel?: string;
    details: string[];
    image: string;
  }> = [
    {
      key: 'culture',
      cardTitle: t('about_culture_card_title'),
      headline: t('about_culture_headline'),
      supportLine: t('about_culture_support'),
      description: t('about_culture_desc'),
      details: [],
      image: `${baseUrl}images/cultura.png`,
    },
    {
      key: 'mission',
      cardTitle: t('about_mission_card_title'),
      headline: t('about_mission_headline'),
      supportLine: t('about_mission_support'),
      description: t('about_mission_desc'),
      details: [],
      image: `${baseUrl}images/missao.png`,
    },
    {
      key: 'base',
      cardTitle: t('about_base_card_title'),
      headline: t('about_base_headline'),
      supportLine: t('about_base_support'),
      description: t('about_base_highlight'),
      detailLabel: t('about_base_pillars_title'),
      details: [t('about_pillar_1_title'), t('about_pillar_2_title'), t('about_pillar_3_title')],
      image: `${baseUrl}images/base.png`,
    },
    {
      key: 'values',
      cardTitle: t('about_values_card_title'),
      headline: t('about_values_headline'),
      supportLine: t('about_values_support'),
      description: t('about_values_support'),
      detailLabel: t('about_values_title'),
      details: [
        t('about_value_1_title'),
        t('about_value_2_title'),
        t('about_value_3_title'),
        t('about_value_4_title'),
        t('about_value_5_title'),
      ],
      image: `${baseUrl}images/valores.png`,
    },
  ];

  const currentScene = scenes[activeScene];
  const nextScene = scenes[(activeScene + 1) % scenes.length];
  const currentImage = imageErrors[currentScene.key] ? fallbackImage : currentScene.image;
  const counter = `${String(activeScene + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;

  const handleNext = () => {
    setActiveScene((current) => (current + 1) % scenes.length);
    setIsCardFlipped(false);
  };

  const handleCardToggle = () => {
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: none)').matches) {
      return;
    }

    setIsCardFlipped((current) => !current);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsCardFlipped((current) => !current);
    }
  };

  const handleImageError = (sceneKey: SceneKey) => {
    setImageErrors((current) => {
      if (current[sceneKey]) {
        return current;
      }

      return { ...current, [sceneKey]: true };
    });
  };

  return (
    <section id="sobre-nos" className="relative overflow-hidden bg-[#050505] py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(197,160,40,0.22),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(255,255,255,0.06),transparent_18%),linear-gradient(180deg,rgba(5,5,5,0.96)_0%,rgba(5,5,5,1)_100%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(197,160,40,0.05)_0,transparent_30%,transparent_70%,rgba(197,160,40,0.05)_100%)]"></div>
      <div className="absolute top-0 left-0 h-28 w-full bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black to-transparent pointer-events-none"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-16 lg:px-24">
        <div className="mx-auto w-fit">
          <div className="pl-1 text-left">
            <span className="block text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">{t('about_kicker')}</span>
            <h2 className="mt-4 text-[2.9rem] font-light uppercase leading-[0.9] tracking-[-0.06em] text-white md:text-[4.8rem]">
              {currentScene.cardTitle}
            </h2>
          </div>

          <div className="mt-8 flex w-full flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
            <div
              role="button"
              tabIndex={0}
              aria-label={currentScene.cardTitle}
              aria-expanded={isCardFlipped}
              onClick={handleCardToggle}
              onKeyDown={handleCardKeyDown}
              onMouseLeave={() => setIsCardFlipped(false)}
              className="group [perspective:1600px] relative h-[440px] w-[280px] cursor-pointer md:h-[560px] md:w-[340px]"
            >
              <div
                className={[
                  'relative h-full w-full rounded-[30px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d]',
                  isCardFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)] md:group-hover:[transform:rotateY(180deg)]',
                ].join(' ')}
              >
                <div className="absolute inset-0 overflow-hidden rounded-[30px] border border-white/10 bg-black/55 shadow-[0_30px_90px_rgba(0,0,0,0.55)] [backface-visibility:hidden]">
                  <img
                    key={currentScene.key}
                    src={currentImage}
                    alt={currentScene.cardTitle}
                    onError={() => handleImageError(currentScene.key)}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.14)_38%,rgba(0,0,0,0.92)_100%)]"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(197,160,40,0.28),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.12),transparent_18%)]"></div>
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent"></div>

                  <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A028]/32 bg-black/45 text-brand-gold shadow-[0_0_24px_rgba(197,160,40,0.18)] backdrop-blur-sm">
                      <SceneIcon scene={currentScene.key} />
                    </div>
                    <div className="text-[10px] font-black tracking-[0.4em] text-white/46">{counter}</div>
                  </div>

                  <div className="absolute inset-x-5 bottom-5">
                    <div className="h-[2px] w-14 rounded-full bg-brand-gold/85"></div>
                    <p className="mt-4 max-w-[12rem] text-[1.95rem] font-light leading-[0.98] tracking-tight text-white md:text-[2.35rem]">
                      {currentScene.headline}
                    </p>
                    <p className="mt-3 max-w-[13rem] text-[11px] font-black uppercase tracking-[0.24em] text-white/58">
                      {currentScene.cardTitle}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-[30px] border border-[#C5A028]/18 bg-[linear-gradient(180deg,rgba(8,8,8,0.98)_0%,rgba(0,0,0,1)_100%)] shadow-[0_34px_96px_rgba(0,0,0,0.68)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(197,160,40,0.14),transparent_34%),linear-gradient(180deg,transparent_0%,rgba(197,160,40,0.06)_100%)]"></div>
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold/75 to-transparent"></div>

                  <div className="relative flex h-full flex-col p-5 md:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A028]/30 bg-[#101010] text-brand-gold shadow-[0_0_24px_rgba(197,160,40,0.12)]">
                        <SceneIcon scene={currentScene.key} />
                      </div>
                      <div className="text-[10px] font-black tracking-[0.4em] text-white/34">{counter}</div>
                    </div>

                    <div className="mt-6">
                      <div className="text-[11px] font-black uppercase tracking-[0.36em] text-brand-gold">{currentScene.cardTitle}</div>
                      <p className="mt-4 text-[1.75rem] font-light leading-[1.02] tracking-tight text-white md:text-[2rem]">
                        {currentScene.headline}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-white/72 md:text-[15px]">{currentScene.description}</p>
                    </div>

                    <div className="mt-5 h-px w-full bg-white/8"></div>

                    <div className="mt-5 flex-1">
                      <div className="text-[10px] font-black uppercase tracking-[0.28em] text-white/34">
                        {currentScene.detailLabel ?? currentScene.supportLine}
                      </div>

                      {currentScene.details.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {currentScene.details.map((detail) => (
                            <div
                              key={detail}
                              className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/72"
                            >
                              {detail}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-4 text-[13px] leading-relaxed text-white/62">{currentScene.supportLine}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:flex-col">
              <button
                type="button"
                aria-label={`${t('about_next')}: ${nextScene.cardTitle}`}
                onClick={handleNext}
                className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#C5A028]/30 bg-black/55 text-brand-gold shadow-[0_16px_42px_rgba(0,0,0,0.38)] backdrop-blur transition-all duration-300 hover:border-[#F1D592]/40 hover:bg-[#C5A028]/12 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 md:h-14 md:w-14"
              >
                <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
              <div className="text-[10px] font-black tracking-[0.4em] text-white/34 md:mt-1">{counter}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
