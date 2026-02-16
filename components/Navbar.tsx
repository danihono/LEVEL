
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#' },
    { name: 'ESCOLAS', href: '#escolas' },
    { name: 'TEAM', href: '#team' },
    { name: 'STORE', href: '#store' },
    { name: 'CONTATO', href: '#contato' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-4 md:py-6 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* New Brand Logo */}
        <div className="flex items-center group cursor-pointer h-16 md:h-20">
          <Logo 
            variant={isScrolled ? 'dark' : 'light'} 
            className="h-full" 
            showText={true} 
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold tracking-widest transition-colors relative group ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <button className="hidden md:block bg-brand-orange hover:bg-yellow-500 text-black px-6 py-2 text-sm font-bold tracking-widest transition-all transform hover:scale-105">
          SEJA UM AFILIADO
        </button>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden flex flex-col space-y-1.5 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`w-6 h-0.5 transition-all ${isScrolled || isMenuOpen ? 'bg-black' : 'bg-white'}`}></span>
          <span className={`w-6 h-0.5 transition-all ${isScrolled || isMenuOpen ? 'bg-black' : 'bg-white'}`}></span>
          <span className={`w-6 h-0.5 transition-all ${isScrolled || isMenuOpen ? 'bg-black' : 'bg-white'}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center space-y-8 transition-transform duration-500 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button 
          className="absolute top-8 right-8 text-black text-3xl"
          onClick={() => setIsMenuOpen(false)}
        >
          &times;
        </button>
        <Logo className="h-32 mb-8" variant="dark" />
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-bold text-black tracking-widest hover:text-brand-orange"
          >
            {link.name}
          </a>
        ))}
        <button className="bg-brand-orange text-black px-8 py-3 font-bold tracking-widest">
          SEJA UM AFILIADO
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
