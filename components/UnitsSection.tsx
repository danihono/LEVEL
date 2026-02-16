
import React from 'react';

const units = [
  { city: 'SÃO PAULO', name: 'LEVEL MATRIZ', img: 'https://images.unsplash.com/photo-1593079359048-d98a09addc8d?q=80&w=2070&auto=format&fit=crop' },
  { city: 'RIO DE JANEIRO', name: 'LEVEL IPANEMA', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2158?q=80&w=2069&auto=format&fit=crop' },
  { city: 'MIAMI', name: 'LEVEL BRICKELL', img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop' },
  { city: 'LISBOA', name: 'LEVEL ALVALADE', img: 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=1900&auto=format&fit=crop' },
];

const UnitsSection: React.FC = () => {
  return (
    <section id="escolas" className="bg-transparent py-32 px-4 md:px-0">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 reveal">
          <div>
            <span className="text-brand-orange font-bold tracking-[0.4em] text-xs uppercase mb-4 block">NOSSAS UNIDADES</span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white">PRESENÇA <span className="font-bold">GLOBAL</span></h2>
          </div>
          <button className="mt-8 md:mt-0 border-b-2 border-brand-orange pb-2 text-xs font-bold tracking-[0.3em] hover:text-brand-orange transition-all uppercase">VER TODAS UNIDADES</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {units.map((unit, idx) => (
            <div key={idx} className="group relative h-[500px] overflow-hidden reveal border border-white/5" style={{ transitionDelay: `${idx * 100}ms` }}>
              <img 
                src={unit.img} 
                alt={unit.name} 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-10 text-white w-full">
                <p className="text-[10px] font-black tracking-[0.4em] text-brand-orange mb-3">{unit.city}</p>
                <h4 className="text-2xl font-bold tracking-tight">{unit.name}</h4>
                <div className="mt-6 h-[1px] w-0 group-hover:w-full bg-brand-orange transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnitsSection;
