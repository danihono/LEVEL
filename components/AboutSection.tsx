import React, { useState, useRef, useEffect } from 'react';
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
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // [slideIndex][elementIndex]: kicker=0, headline=1, divider=2, description=3
  const elementRefs = useRef<(HTMLElement | null)[][]>(
    Array.from({ length: SCENE_COUNT }, () => new Array(4).fill(null))
  );
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

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const inner = innerRef.current;
      const track = trackRef.current;
      if (!section || !inner || !track) return;

      const scrolled = -section.getBoundingClientRect().top;
      const maxScroll = section.offsetHeight - window.innerHeight;

      // stagger em unidades de slideProgress (kicker→headline→divider→desc)
      const STAGGER = [0, 0.07, 0.13, 0.19];
      const EXIT_WIN = 0.26;
      const ENTER_WIN = 0.36;

      const applyReveal = (sp: number) => {
        elementRefs.current.forEach((els, slideIdx) => {
          const slideOffset = sp - slideIdx;

          els.forEach((el, elIdx) => {
            if (!el) return;
            const stagger = STAGGER[elIdx] ?? 0;
            let opacity: number;
            let ty: number;

            if (slideOffset <= 0) {
              // Entrando da direita — cada elemento tem seu próprio delay
              const adjusted = slideOffset + stagger;
              const raw = Math.max(0, (adjusted + ENTER_WIN) / ENTER_WIN);
              const t = 1 - (1 - raw) * (1 - raw); // ease-out
              opacity = t;
              ty = (1 - t) * 56;
            } else {
              // Saindo pela esquerda — todos somem juntos rápido
              const raw = Math.max(0, 1 - slideOffset / EXIT_WIN);
              const t = raw * raw; // ease-in
              opacity = t;
              ty = (1 - t) * -20;
            }

            el.style.opacity = String(opacity);
            el.style.transform = `translateY(${ty}px)`;
          });
        });
      };

      if (scrolled <= 0) {
        inner.style.position = 'relative';
        inner.style.top = '0px';
        inner.style.left = '';
        inner.style.width = '';
        track.style.transform = 'translateX(0vw)';
        setActiveSlide(0);
        applyReveal(0);
      } else if (scrolled >= maxScroll) {
        inner.style.position = 'absolute';
        inner.style.top = `${maxScroll}px`;
        inner.style.left = '';
        inner.style.width = '';
        track.style.transform = `translateX(${-(SCENE_COUNT - 1) * 100}vw)`;
        setActiveSlide(SCENE_COUNT - 1);
        applyReveal(SCENE_COUNT - 1);
      } else {
        inner.style.position = 'fixed';
        inner.style.top = '0px';
        inner.style.left = '0px';
        inner.style.width = '100%';
        const progress = scrolled / maxScroll;
        const sp = progress * (SCENE_COUNT - 1);
        track.style.transform = `translateX(${-progress * (SCENE_COUNT - 1) * 100}vw)`;
        setActiveSlide(Math.round(sp));
        applyReveal(sp);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre-nos"
      style={{ height: `${SCENE_COUNT * 100}vh` }}
      className="relative"
    >
      <div
        ref={innerRef}
        className="w-full h-screen overflow-hidden bg-[#050505]"
        style={{ position: 'relative', top: 0, left: 0 }}
      >
        {/* Progress bar */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-8">
          {scenes.map((scene, i) => (
            <div
              key={scene.key}
              className="flex flex-col items-center gap-2 transition-all duration-500"
              style={{ color: i === activeSlide ? scene.accent : 'rgba(255,255,255,0.25)' }}
            >
              <SceneIcon scene={scene.key} className="h-5 w-5" />
              <div
                className="h-px w-8 rounded-full transition-all duration-500"
                style={{ background: i === activeSlide ? scene.accent : 'rgba(255,255,255,0.15)' }}
              />
            </div>
          ))}
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${SCENE_COUNT * 100}vw`, willChange: 'transform' }}
        >
          {scenes.map((scene, i) => (
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

                  {/* Left: text — elementos com stagger reveal */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div
                      ref={el => { elementRefs.current[i][0] = el; }}
                      className="flex items-center gap-3 mb-6"
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

                    <h2
                      ref={el => { elementRefs.current[i][1] = el; }}
                      className="text-[2.8rem] font-light uppercase leading-[0.9] tracking-[-0.05em] text-white md:text-[4rem] lg:text-[5rem]"
                    >
                      {scene.headline}
                    </h2>

                    <div
                      ref={el => { elementRefs.current[i][2] = el; }}
                      className="mt-6 h-[2px] w-14 rounded-full"
                      style={{ background: scene.accent }}
                    />

                    {scene.details ? (
                      <div
                        ref={el => { elementRefs.current[i][3] = el; }}
                        className="mt-5 max-w-xl space-y-1.5 text-[13px] leading-relaxed text-white/62 sm:text-[14px] md:mt-6 md:space-y-3 md:text-[15px]"
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
                        ref={el => { elementRefs.current[i][3] = el; }}
                        className="mt-6 max-w-md whitespace-pre-line text-[15px] leading-relaxed text-white/58 md:text-base"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
