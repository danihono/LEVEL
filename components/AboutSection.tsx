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

const SCENE_COUNT = 4;

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const baseUrl = import.meta.env.BASE_URL;

  const scenes: Array<{
    key: SceneKey;
    cardTitle: string;
    headline: string;
    description: string;
    details?: Array<{ title: string; description: string }>;
    image: string;
    accent: string;
  }> = [
    {
      key: 'culture',
      cardTitle: t('about_culture_card_title'),
      headline: t('about_culture_headline'),
      description: t('about_culture_desc'),
      image: `${baseUrl}images/cultura.png`,
      accent: '#C5A028',
    },
    {
      key: 'base',
      cardTitle: t('about_base_card_title'),
      headline: t('about_base_headline'),
      description: t('about_base_highlight'),
      details: [
        { title: t('about_pillar_1_title'), description: t('about_pillar_1_desc') },
        { title: t('about_pillar_2_title'), description: t('about_pillar_2_desc') },
        { title: t('about_pillar_3_title'), description: t('about_pillar_3_desc') },
      ],
      image: `${baseUrl}images/base.png`,
      accent: '#2DD4BF',
    },
    {
      key: 'mission',
      cardTitle: t('about_mission_card_title'),
      headline: t('about_mission_headline'),
      description: t('about_mission_desc'),
      image: `${baseUrl}images/missao.png`,
      accent: '#4B9EF5',
    },
    {
      key: 'values',
      cardTitle: t('about_values_card_title'),
      headline: t('about_values_headline'),
      description: t('about_values_support'),
      details: [
        { title: t('about_value_1_title'), description: t('about_value_1_desc') },
        { title: t('about_value_2_title'), description: t('about_value_2_desc') },
        { title: t('about_value_3_title'), description: t('about_value_3_desc') },
        { title: t('about_value_4_title'), description: t('about_value_4_desc') },
        { title: t('about_value_5_title'), description: t('about_value_5_desc') },
      ],
      image: `${baseUrl}images/valores.png`,
      accent: '#F05A5A',
    },
  ];

  const goNext = () => setActiveSlide(s => Math.min(s + 1, SCENE_COUNT - 1));
  const goPrev = () => setActiveSlide(s => Math.max(s - 1, 0));

  const currentAccent = scenes[activeSlide].accent;

  return (
    <section
      id="sobre-nos"
      className="relative overflow-hidden bg-[#050505]"
      style={{ height: '100vh' }}
    >
      {/* Progress bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-8">
        {scenes.map((scene, i) => (
          <button
            key={scene.key}
            onClick={() => setActiveSlide(i)}
            className="flex flex-col items-center gap-2 transition-all duration-500 cursor-pointer"
            style={{ color: i === activeSlide ? scene.accent : 'rgba(255,255,255,0.25)' }}
            aria-label={scene.cardTitle}
          >
            <SceneIcon scene={scene.key} className="h-5 w-5" />
            <div
              className="h-px w-8 rounded-full transition-all duration-500"
              style={{ background: i === activeSlide ? scene.accent : 'rgba(255,255,255,0.15)' }}
            />
          </button>
        ))}
      </div>

      {/* Prev button */}
      {activeSlide > 0 && (
        <button
          onClick={goPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
          style={{
            width: 72,
            height: 72,
            background: 'rgba(255,255,255,0.07)',
            border: `1px solid ${currentAccent}55`,
            color: currentAccent,
          }}
          aria-label="Slide anterior"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {activeSlide < SCENE_COUNT - 1 && (
        <button
          onClick={goNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
          style={{
            width: 72,
            height: 72,
            background: 'rgba(255,255,255,0.07)',
            border: `1px solid ${currentAccent}55`,
            color: currentAccent,
          }}
          aria-label="Próximo slide"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Horizontal track */}
      <div
        className="flex h-full"
        style={{
          width: `${SCENE_COUNT * 100}vw`,
          transform: `translateX(${-activeSlide * 100}vw)`,
          transition: 'transform 0.7s cubic-bezier(0.77,0,0.18,1)',
          willChange: 'transform',
        }}
      >
        {scenes.map((scene, i) => {
          const isActive = i === activeSlide;
          return (
            <div
              key={scene.key}
              className="relative h-full overflow-hidden flex-shrink-0"
              style={{ width: '100vw' }}
            >
              {/* Radial gradient background */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 25% 60%, ${scene.accent}1a, transparent 55%), #050505`,
                }}
              />

              {/* Top/bottom vignette */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,transparent_40%,rgba(0,0,0,0.35)_100%)] pointer-events-none" />

              {/* Giant background number */}
              <div
                className="absolute bottom-0 right-6 font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: '28vw',
                  color: scene.accent,
                  opacity: 0.06,
                  lineHeight: 0.82,
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Slide content */}
              <div className="relative z-10 flex h-full items-center px-8 pt-36 pb-10 md:px-16 md:pt-44 md:pb-16 lg:px-24">
                <div className="flex w-full flex-col gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16">

                  {/* Left: text — stagger reveal via CSS transitions */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    {/* kicker — delay 0ms */}
                    <div
                      className="flex items-center gap-3 mb-6 transition-all duration-500"
                      style={{
                        transitionDelay: isActive ? '0ms' : '0ms',
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0px)' : 'translateY(24px)',
                      }}
                    >
                      <span style={{ color: scene.accent }}>
                        <SceneIcon scene={scene.key} className="h-5 w-5" />
                      </span>
                      <span
                        className="text-[10px] font-black uppercase tracking-[0.5em]"
                        style={{ color: scene.accent }}
                      >
                        {scene.cardTitle}
                      </span>
                    </div>

                    {/* headline — delay 80ms */}
                    <h2
                      className="text-[2.8rem] font-light uppercase leading-[0.9] tracking-[-0.05em] text-white md:text-[4rem] lg:text-[5rem] transition-all duration-500"
                      style={{
                        transitionDelay: isActive ? '80ms' : '0ms',
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0px)' : 'translateY(24px)',
                      }}
                    >
                      {scene.headline}
                    </h2>

                    {/* divider — delay 140ms */}
                    <div
                      className="mt-6 h-[2px] w-14 rounded-full transition-all duration-500"
                      style={{
                        background: scene.accent,
                        transitionDelay: isActive ? '140ms' : '0ms',
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0px)' : 'translateY(24px)',
                      }}
                    />

                    {/* description — delay 200ms */}
                    {scene.details ? (
                      <div
                        className="mt-5 max-w-xl space-y-1.5 text-[13px] leading-relaxed text-white/62 sm:text-[14px] md:mt-6 md:space-y-3 md:text-[15px] transition-all duration-500"
                        style={{
                          transitionDelay: isActive ? '200ms' : '0ms',
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'translateY(0px)' : 'translateY(24px)',
                        }}
                      >
                        {scene.details.map((detail) => (
                          <div key={detail.title} className="flex gap-3">
                            <span
                              className="mt-[0.7em] h-1.5 w-1.5 flex-shrink-0 rounded-full"
                              style={{ background: scene.accent }}
                              aria-hidden="true"
                            />
                            <p>
                              <span className="font-semibold text-white/82">{detail.title}:</span>{' '}
                              {detail.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p
                        className="mt-6 max-w-md whitespace-pre-line text-[15px] leading-relaxed text-white/58 md:text-base transition-all duration-500"
                        style={{
                          transitionDelay: isActive ? '200ms' : '0ms',
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'translateY(0px)' : 'translateY(24px)',
                        }}
                      >
                        {scene.description}
                      </p>
                    )}
                  </div>

                  {/* Right: image card 16:9 */}
                  <div className="hidden md:block flex-shrink-0" style={{ width: 'clamp(360px, 46vw, 700px)' }}>
                    <div
                      className="relative overflow-hidden rounded-[20px]"
                      style={{
                        width: '100%',
                        aspectRatio: '16 / 9',
                        boxShadow: `0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px ${scene.accent}22`,
                      }}
                    >
                      <img
                        src={scene.image}
                        alt={scene.cardTitle}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.08)_40%,rgba(0,0,0,0.72)_100%)]" />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at top left, ${scene.accent}22, transparent 42%)`,
                        }}
                      />
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${scene.accent}cc, transparent)`,
                        }}
                      />
                      <div className="absolute top-4 right-4 text-[10px] font-black tracking-[0.4em] text-white/36">
                        {String(i + 1).padStart(2, '0')} / {String(SCENE_COUNT).padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutSection;
