
import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="bg-black py-24 px-4 md:px-0">
      <div className="max-w-4xl mx-auto text-center reveal">
        <h2 className="text-white text-3xl md:text-4xl font-light tracking-tighter mb-4">
          FIQUE POR DENTRO DO <span className="font-bold text-brand-orange">LEVEL</span>
        </h2>
        <p className="text-zinc-400 font-light mb-10">Assine nossa newsletter para receber conteúdos exclusivos, lançamentos da loja e novidades do time.</p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            className="flex-grow bg-zinc-900 border border-zinc-800 px-6 py-4 text-white focus:outline-none focus:border-brand-orange transition-all"
            required
          />
          <button className="bg-brand-orange hover:bg-orange-600 text-white px-10 py-4 font-bold tracking-widest transition-all">
            INSCREVER
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
