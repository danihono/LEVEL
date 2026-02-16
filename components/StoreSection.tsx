
import React from 'react';

const products = [
  { name: 'GI PRO SERIES - WHITE', price: 'R$ 890,00', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop' },
  { name: 'LEVEL TRAINING RASHGUARD', price: 'R$ 240,00', img: 'https://images.unsplash.com/photo-1517438476312-10d79c67750d?q=80&w=2017&auto=format&fit=crop' },
  { name: 'LIFESTYLE HOODIE BLACK', price: 'R$ 380,00', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop' },
];

const StoreSection: React.FC = () => {
  return (
    <section id="store" className="bg-transparent py-32 px-4 md:px-0">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-24 reveal">
          <span className="text-brand-orange font-bold tracking-[0.5em] text-xs uppercase block mb-4">Lifestyle & Gear</span>
          <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-white">LEVEL <span className="font-bold">STORE</span></h2>
          <div className="mt-10 w-20 h-[2px] bg-brand-orange mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {products.map((product, idx) => (
            <div key={idx} className="group cursor-pointer reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
              <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden mb-8 border border-white/5">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-700"></div>
                <button className="absolute bottom-0 left-0 w-full bg-brand-orange text-black py-6 font-bold text-[10px] tracking-[0.4em] translate-y-full group-hover:translate-y-0 transition-transform duration-500 uppercase">
                  COMPRAR AGORA
                </button>
              </div>
              <h4 className="text-lg font-bold tracking-tight mb-2 text-white">{product.name}</h4>
              <p className="text-brand-orange font-light tracking-[0.2em] text-sm">{product.price}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-24 text-center reveal">
          <button className="border border-white/20 px-16 py-5 font-bold text-[10px] tracking-[0.4em] text-white hover:bg-white hover:text-black transition-all uppercase">
            EXPLORAR TODA A COLEÇÃO
          </button>
        </div>
      </div>
    </section>
  );
};

export default StoreSection;
