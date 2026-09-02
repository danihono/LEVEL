
import React, { useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const AppSection: React.FC = () => {
  const { t } = useLanguage();
  const baseUrl = import.meta.env.BASE_URL;

  const tiltRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Inclinação de descanso — o mouse soma por cima
  const BASE_RX = 0;
  const BASE_RY = 0;
  const BASE_RZ = 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    // Parallax sutil (~±8°)
    const ry = (px - 0.5) * 16;
    const rx = (0.5 - py) * 16;
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <section className="relative w-full py-32 px-8 md:px-16 lg:px-24 overflow-hidden">
      {/* ===== Fundo premium ===== */}
      {/* Brilho dourado sutil (fumaça localizada) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(900px 600px at 75% 40%, rgba(197,160,40,0.10), transparent 60%), radial-gradient(700px 500px at 15% 80%, rgba(241,213,146,0.05), transparent 65%)',
        }}
      ></div>

      {/* Textura de tecido de kimono (quase invisível) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.6]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(197,160,40,0.035) 0px, rgba(197,160,40,0.035) 1px, transparent 1px, transparent 7px), repeating-linear-gradient(-45deg, rgba(197,160,40,0.035) 0px, rgba(197,160,40,0.035) 1px, transparent 1px, transparent 7px)',
        }}
      ></div>

      {/* Logo LEVEL gigante em outline (~5% opacidade) */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <span
          className="select-none whitespace-nowrap text-[34vw] font-black italic leading-none tracking-tighter opacity-[0.05]"
          style={{ WebkitTextStroke: '2px rgba(197,160,40,0.9)', color: 'transparent' }}
        >
          LEVEL
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Coluna esquerda — texto + CTA */}
        <div className="order-2 lg:order-1">
          {/* Kicker */}
          <div className="reveal" style={{ transitionDelay: '80ms' }}>
            <span className="bb-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-black tracking-[0.28em] text-brand-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold shadow-[0_0_10px_#C5A028]"></span>
              {t('app_kicker')}
            </span>
          </div>

          {/* Headline */}
          <h2
            className="reveal mt-8 text-4xl md:text-6xl lg:text-7xl font-extralight leading-[0.98] tracking-tighter text-white"
            style={{ transitionDelay: '160ms' }}
          >
            <span className="block">{t('app_title_prefix')}</span>
            <span className="block font-black italic text-brand-gold drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              {t('app_title_gold')}
            </span>
          </h2>

          {/* Descrição */}
          <p
            className="reveal mt-8 max-w-xl text-zinc-300 text-base md:text-lg font-light leading-relaxed border-l border-brand-gold/40 pl-6"
            style={{ transitionDelay: '240ms' }}
          >
            {t('app_desc')}
          </p>

          {/* Badges das lojas */}
          <div className="reveal mt-10 flex flex-wrap items-center gap-4" style={{ transitionDelay: '320ms' }}>
            <a
              href="https://applevel-c5e73.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="app-badge group flex items-center gap-3 rounded-2xl px-5 py-3"
            >
              <svg viewBox="0 0 384 512" className="h-7 w-7 fill-white" aria-hidden="true">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <span className="text-left leading-tight">
                <span className="block text-[10px] font-medium tracking-wide text-zinc-400">{t('app_badge_appstore_top')}</span>
                <span className="block text-sm font-semibold text-white">{t('app_badge_appstore_main')}</span>
              </span>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.leveljiujitsu.app&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="app-badge group flex items-center gap-3 rounded-2xl px-5 py-3"
            >
              <svg viewBox="0 0 512 512" className="h-7 w-7" aria-hidden="true">
                <path fill="#34A853" d="M48 59.5C42 65.8 38.5 75.5 38.5 88v336c0 12.5 3.5 22.2 9.5 28.5L256 256 48 59.5z" opacity="0" />
                <path fill="#EA4335" d="M325.3 234.3 104.6 13.6l268 154.6-47.3 66.1z" />
                <path fill="#FBBC04" d="M104.6 13.6c-9.6-5.5-19.4-6-27.3-2.3L296 256 77.3 500.7c7.9 3.7 17.7 3.2 27.3-2.3l268-154.6V168.2L104.6 13.6z" opacity="0" />
                <path fill="#34A853" d="M77.3 11.3C70.6 14.5 66 21.2 66 31.2v449.6c0 10 4.6 16.7 11.3 19.9L296 256 77.3 11.3z" />
                <path fill="#FBBC04" d="M372.3 168.2 296 256l76.3 87.8 70.6-40.7c20.9-12.1 20.9-42 0-54.1l-70.6-40.8z" />
                <path fill="#EA4335" d="M77.3 11.3 296 256l29.3-33.7L104.6 1.6c-9.6-5.5-19.4-6-27.3 1.3v8.4z" />
                <path fill="#4285F4" d="M296 256 77.3 500.7c7.9 3.7 17.7 3.2 27.3-2.3l220.7-127.2L296 256z" />
              </svg>
              <span className="text-left leading-tight">
                <span className="block text-[10px] font-medium tracking-wide text-zinc-400">{t('app_badge_play_top')}</span>
                <span className="block text-sm font-semibold text-white">{t('app_badge_play_main')}</span>
              </span>
            </a>
          </div>

          {/* Botão principal */}
          <div className="reveal mt-8" style={{ transitionDelay: '400ms' }}>
            <a
              href="https://applevel-c5e73.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bb-btn inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-black tracking-[0.18em] text-white"
            >
              {t('app_btn_download')}
              <span className="text-brand-gold">↓</span>
            </a>
          </div>
        </div>

        {/* Coluna direita — iPhone CSS 3D */}
        <div className="order-1 lg:order-2 flex justify-center">
          <div
            className="relative"
            style={{ perspective: '1200px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={tiltRef}
              className="app-phone-tilt"
              style={{ transform: `rotateX(${BASE_RX + tilt.rx}deg) rotateY(${BASE_RY + tilt.ry}deg) rotateZ(${BASE_RZ}deg)` }}
            >
              <div className="app-float relative">
                {/* Aura dourada / luz saindo do celular */}
                <div
                  className="pointer-events-none absolute -inset-10 -z-10 rounded-[4rem] blur-3xl"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 45%, rgba(241,213,146,0.38) 0%, rgba(197,160,40,0.22) 35%, rgba(197,160,40,0.06) 60%, transparent 75%)',
                  }}
                ></div>

                {/* Moldura do iPhone */}
                <div className="relative w-[280px] md:w-[320px] aspect-[9/19.5] rounded-[2.8rem] bg-[#0a0a0a] p-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.7),0_0_70px_rgba(197,160,40,0.25)] ring-1 ring-brand-gold/25">
                  {/* Borda interna / bisel */}
                  <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-[#050505] border border-white/5">
                    {/* Tela do app */}
                    <img
                      src={`${baseUrl}images/app.png`}
                      alt="App LEVEL"
                      className="h-full w-full object-contain"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                    />
                    {/* Reflexo sutil */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/10"></div>
                  </div>

                  {/* Notch / Dynamic Island */}
                  <div className="absolute left-1/2 top-[18px] z-10 h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"></div>

                  {/* Botões laterais */}
                  <div className="absolute -left-[2px] top-[110px] h-10 w-[3px] rounded-l bg-[#1a1a1a]"></div>
                  <div className="absolute -left-[2px] top-[160px] h-16 w-[3px] rounded-l bg-[#1a1a1a]"></div>
                  <div className="absolute -right-[2px] top-[140px] h-20 w-[3px] rounded-r bg-[#1a1a1a]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AppSection;
