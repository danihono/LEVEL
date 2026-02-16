
import React from 'react';

const FullMatImage: React.FC = () => {
  return (
    <section className="relative h-[700px] w-full parallax-bg overflow-hidden" 
             style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2065&auto=format&fit=crop")' }}>
      {/* Blend gradients to transition between dark smoke and the image */}
      <div className="absolute inset-0 mat-image-gradient"></div>
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="absolute inset-0 flex items-center justify-center p-8 text-center reveal">
        <div className="max-w-4xl">
          <span className="text-brand-orange font-black tracking-[0.5em] text-xs uppercase block mb-6">Filosofia de Vida</span>
          <h2 className="text-white text-4xl md:text-7xl font-light tracking-tighter leading-tight">
            NÃO É SÓ SOBRE LUTAR. <br />
            <span className="font-bold italic">É SOBRE EVOLUIR EM COMUNIDADE.</span>
          </h2>
          <div className="mt-12 w-24 h-1 bg-brand-orange mx-auto shadow-[0_0_15px_#F7B500]"></div>
        </div>
      </div>
    </section>
  );
};

export default FullMatImage;
