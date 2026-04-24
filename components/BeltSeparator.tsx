import React from 'react';

const BeltSeparator: React.FC = () => {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="relative w-full h-32 flex items-center justify-center my-4 z-30 pointer-events-none select-none overflow-visible">
      {/* Divisória horizontal */}
      <div className="absolute left-0 right-0 h-10 bg-[#080808] shadow-[0_12px_40px_rgba(0,0,0,0.9)] flex flex-col justify-between py-1.5 overflow-hidden border-y border-white/5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full h-[1.5px] bg-white/5 shadow-inner" />
        ))}
      </div>

      {/* Imagem da faixa por cima */}
      <div className="relative z-10 translate-y-2">
        <img
          src={`${baseUrl}images/faixa.png`}
          alt="belt separator"
          className="w-64 h-auto drop-shadow-[0_22px_38px_rgba(0,0,0,0.95)]"
        />
      </div>
    </div>
  );
};

export default BeltSeparator;
