
import React from 'react';

const MapSection: React.FC = () => {
  return (
    <section className="bg-zinc-950/50 py-32 px-4 md:px-0 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <div className="w-full lg:w-1/3 reveal">
          <span className="text-brand-orange font-bold tracking-[0.4em] text-xs uppercase block mb-4">Localizador</span>
          <h2 className="text-5xl font-light mb-8 tracking-tighter text-white leading-none">ENCONTRE O SEU <span className="font-bold">LEVEL</span></h2>
          <p className="text-zinc-500 font-light mb-12 leading-relaxed text-lg">
            Estamos em constante expansão global. Use nosso localizador para encontrar a LEVEL mais próxima e viva a experiência premium.
          </p>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Sua localização (Cidade ou CEP)" 
              className="w-full bg-transparent border border-zinc-800 px-8 py-6 outline-none focus:border-brand-orange transition-all text-white font-light text-sm tracking-widest placeholder:text-zinc-700"
            />
            <button className="absolute right-3 top-3 bottom-3 bg-brand-orange text-black px-10 font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-yellow-500 transition-all">
              BUSCAR
            </button>
          </div>
        </div>
        
        <div className="w-full lg:w-2/3 h-[600px] bg-black relative overflow-hidden reveal border border-white/10">
          {/* Mock Map Background */}
          <div 
            className="absolute inset-0 opacity-40 brightness-50"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop")', 
              backgroundSize: 'cover',
              filter: 'grayscale(1) contrast(1.2)'
            }}
          ></div>
          
          {/* Map Overlay Pins */}
          <div className="absolute top-1/4 left-1/3 group">
            <div className="w-6 h-6 bg-brand-orange rounded-full border-4 border-black animate-pulse shadow-[0_0_20px_#F7B500]"></div>
          </div>
          <div className="absolute bottom-1/3 right-1/4 group">
            <div className="w-6 h-6 bg-brand-orange rounded-full border-4 border-black animate-pulse shadow-[0_0_20px_#F7B500]"></div>
          </div>
          
          <div className="absolute bottom-10 left-10 bg-zinc-900/90 backdrop-blur-xl p-10 shadow-2xl max-w-sm border-l-4 border-brand-orange">
            <p className="text-[10px] font-black tracking-[0.4em] text-brand-orange mb-3">UNIDADE EM DESTAQUE</p>
            <h5 className="font-bold text-2xl text-white">LEVEL JARDINS</h5>
            <p className="text-xs text-zinc-400 mt-4 leading-relaxed tracking-widest uppercase">Rua Oscar Freire, 1234<br/>São Paulo, SP - Brasil</p>
            <a href="#" className="inline-block mt-8 text-[10px] font-black tracking-[0.3em] border-b-2 border-brand-orange pb-1 hover:text-brand-orange transition-all uppercase">VER DETALHES</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
