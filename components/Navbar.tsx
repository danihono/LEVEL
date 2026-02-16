
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { useLanguage, Language } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav_home'), href: '#' },
    { name: t('nav_schools'), href: '#escolas' },
    { name: t('nav_team'), href: '#team' },
    { name: t('nav_store'), href: '#store' },
    { name: t('nav_contact'), href: '#contato' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'PT', label: 'Português' },
    { code: 'EN', label: 'English' },
    { code: 'ES', label: 'Español' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 border-b transition-[background-color,backdrop-filter,box-shadow,border-color,padding] duration-500 px-6 md:px-12 py-4 md:py-6 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3' : 'bg-transparent'
      }`}
      style={{ borderBottomColor: isScrolled ? 'rgba(197,160,40,0.12)' : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center group cursor-pointer h-20 md:h-24 w-[110px] md:w-[140px]">
          <Logo 
            variant="light" 
            className="w-full h-full" 
            showText={true}
            useRealLogo={true}
          />
        </div>

        <div className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[10px] font-black tracking-[0.2em] transition-colors relative group ${
                isScrolled ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#C5A028] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          {/* Language Switcher */}
          <div className="relative ml-4">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center justify-center p-2 rounded-full border border-[#C5A028]/30 hover:border-[#C5A028] transition-all group gold-glow"
              title="Change Language"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5A028" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span className="ml-2 text-[10px] font-black text-[#C5A028]">{language}</span>
            </button>

            {isLangOpen && (
              <div className="absolute top-full right-0 mt-4 w-40 bg-black/95 backdrop-blur-xl border border-[#C5A028]/20 py-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-6 py-3 text-[10px] font-black tracking-widest transition-colors hover:bg-[#C5A028]/10 flex justify-between items-center ${
                      language === lang.code ? 'text-[#C5A028]' : 'text-zinc-400'
                    }`}
                  >
                    {lang.code} <span className="text-[8px] opacity-50">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button 
          className="md:hidden flex flex-col space-y-1.5 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="w-6 h-0.5 bg-white transition-all"></span>
          <span className="w-6 h-0.5 bg-white transition-all"></span>
          <span className="w-6 h-0.5 bg-white transition-all"></span>
        </button>
      </div>

      <div 
        className={`fixed inset-0 bg-[#0b0b0b] z-[60] flex flex-col items-center justify-center space-y-8 transition-transform duration-500 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button 
          className="absolute top-8 right-8 text-white text-4xl"
          onClick={() => setIsMenuOpen(false)}
        >
          &times;
        </button>
        <Logo className="h-32 mb-8" variant="light" useRealLogo={true} />
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-bold text-white tracking-[0.2em] hover:text-[#C5A028]"
          >
            {link.name}
          </a>
        ))}
        <div className="flex space-x-6 mt-12">
           {languages.map((lang) => (
             <button
               key={lang.code}
               onClick={() => {
                 setLanguage(lang.code);
                 setIsMenuOpen(false);
               }}
               className={`text-xl font-black ${language === lang.code ? 'text-[#C5A028]' : 'text-zinc-600'}`}
             >
               {lang.code}
             </button>
           ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
