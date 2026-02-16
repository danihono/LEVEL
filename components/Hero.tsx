
import React from 'react';
import Logo from './Logo';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Profissional */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Spotlight effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-80"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-[92%] max-w-7xl h-[65vh] hero-frame flex flex-col justify-center p-10 md:p-24 reveal">
        <div className="mb-10 opacity-90 h-24 md:h-32 flex justify-start">
          <Logo className="h-full" variant="light" showText={false} />
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-light leading-[1.1] tracking-tighter max-w-4xl">
          ELEVE O <span className="text-brand-orange font-bold uppercase">Level</span> <br/>
          <span className="font-thin">DO SEU JIU JITSU</span>
        </h1>
        <p className="mt-8 text-zinc-400 text-lg md:text-xl font-light tracking-wide max-w-xl leading-relaxed">
          Onde a tradição encontra a modernidade. Experimente o padrão LEVEL de ensino em um ambiente exclusivo.
        </p>
        <div className="mt-14 flex flex-col sm:flex-row gap-6">
          <button className="bg-brand-orange hover:bg-[#D9A000] text-black px-12 py-5 font-bold tracking-[0.2em] transition-all shadow-[0_10px_20px_rgba(247,181,0,0.2)] uppercase text-xs">
            ENCONTRAR UNIDADE
          </button>
          <button className="group relative px-12 py-5 overflow-hidden">
            <span className="absolute inset-0 border border-white/20 transition-all group-hover:bg-white/10"></span>
            <span className="relative z-10 text-white font-bold tracking-[0.2em] text-xs uppercase">CONHECER O TIME</span>
          </button>
        </div>
      </div>

      {/* Sombras laterais para profundidade */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent opacity-50"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent opacity-50"></div>
    </section>
  );
};

export default Hero;
