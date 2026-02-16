
import React from 'react';

const ActionCards: React.FC = () => {
  return (
    <section className="bg-transparent py-12 px-4 md:px-0">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Affiliate Card */}
        <div className="relative h-[450px] bg-zinc-900 overflow-hidden flex flex-col justify-center p-12 reveal border border-white/5 group">
          <div 
            className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-1000 bg-cover bg-center grayscale"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-white text-4xl font-bold tracking-tight mb-4">QUERO SER <span className="text-brand-orange underline underline-offset-8">AFILIADO</span></h2>
            <p className="text-zinc-400 mb-10 max-w-sm font-light leading-relaxed">Leve a metodologia LEVEL para sua cidade e transforme sua academia em um centro de excelência internacional.</p>
            <button className="bg-brand-orange hover:bg-yellow-500 text-black px-10 py-4 text-xs font-bold tracking-widest transition-all uppercase">SAIBA MAIS</button>
          </div>
        </div>

        {/* Student Card */}
        <div className="relative h-[450px] bg-zinc-900 overflow-hidden flex flex-col justify-center p-12 reveal border border-white/5 group">
           <div 
            className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-1000 bg-cover bg-center grayscale"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-white text-4xl font-bold tracking-tight mb-4">QUERO SER <span className="text-brand-orange underline underline-offset-8">ALUNO</span></h2>
            <p className="text-zinc-400 mb-10 max-w-sm font-light leading-relaxed">Inicie sua jornada no Jiu Jitsu com os melhores instrutores e uma comunidade focada em alta performance.</p>
            <button className="bg-white hover:bg-zinc-200 text-black px-10 py-4 text-xs font-bold tracking-widest transition-all uppercase">MATRICULE-SE</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionCards;
