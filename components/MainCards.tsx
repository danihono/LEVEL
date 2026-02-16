
import React from 'react';

const cards = [
  { label: 'EQUIPAMENTO', title: 'STORE', img: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1964&auto=format&fit=crop' },
  { label: 'UNIDADES', title: 'ESCOLAS', img: 'https://images.unsplash.com/photo-1599058917233-359990e1189d?q=80&w=2070&auto=format&fit=crop' },
  { label: 'METODOLOGIA', title: 'TEAM', img: 'https://images.unsplash.com/photo-1508216315234-9026be152011?q=80&w=2071&auto=format&fit=crop' },
];

const MainCards: React.FC = () => {
  return (
    <section className="py-24 px-4 md:px-0 bg-transparent">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {cards.map((card, idx) => (
          <a 
            key={idx} 
            href={`#${card.title.toLowerCase()}`}
            className="group relative h-[700px] overflow-hidden reveal shadow-2xl border border-white/5"
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110 grayscale group-hover:grayscale-0 contrast-125"
              style={{ backgroundImage: `url(${card.img})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent group-hover:bg-black/50 transition-all duration-700"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-end p-16 text-white">
              <span className="text-[10px] font-black tracking-[0.5em] mb-4 text-brand-gold opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">{card.label}</span>
              <h3 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8 transform group-hover:-translate-y-4 transition-transform duration-700">
                {card.title}
              </h3>
              <div className="w-12 h-[1px] bg-white/20 group-hover:w-full bg-brand-gold transition-all duration-700"></div>
            </div>
            
            <div className="absolute inset-0 border border-transparent group-hover:border-[#C5A028]/20 transition-all duration-700 pointer-events-none"></div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default MainCards;
