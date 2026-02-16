
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 py-32 px-4 md:px-0">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-10 h-24 flex justify-start items-center">
              <Logo className="h-full" variant="light" />
            </div>
            <p className="text-zinc-500 text-sm font-light leading-relaxed mb-10 max-w-xs">
              Elevando o padrão global do Jiu-Jitsu através de uma metodologia exclusiva e um lifestyle focado na evolução humana.
            </p>
            <div className="flex space-x-6">
              {['Instagram', 'YouTube', 'Facebook'].map(social => (
                <a key={social} href="#" className="text-zinc-600 hover:text-brand-orange transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">{social}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:pl-12">
            <h5 className="font-black text-[10px] tracking-[0.4em] uppercase mb-10 text-brand-orange">Navegação</h5>
            <ul className="space-y-6">
              {['Home', 'Escolas', 'Team', 'Store', 'Filosofia'].map(item => (
                <li key={item}>
                  <a href="#" className="text-zinc-500 text-xs font-bold tracking-widest hover:text-white transition-colors uppercase">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h5 className="font-black text-[10px] tracking-[0.4em] uppercase mb-10 text-brand-orange">Corporativo</h5>
            <ul className="space-y-6">
              {['Seja um Afiliado', 'Portal do Aluno', 'Trabalhe Conosco', 'Imprensa'].map(item => (
                <li key={item}>
                  <a href="#" className="text-zinc-500 text-xs font-bold tracking-widest hover:text-white transition-colors uppercase">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-black text-[10px] tracking-[0.4em] uppercase mb-10 text-brand-orange">Contato</h5>
            <p className="text-white text-sm font-bold tracking-widest mb-4">contato@leveljiujitsu.com.br</p>
            <p className="text-zinc-500 text-xs font-light tracking-widest leading-loose">
              HEADQUARTER SÃO PAULO<br/>
              Avenida Paulista, 1000 - SP - Brasil
            </p>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-zinc-600 text-[9px] tracking-[0.4em] uppercase font-bold">
            © {new Date().getFullYear()} LEVEL JIU JITSU GLOBAL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-12">
            <a href="#" className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase font-bold hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase font-bold hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
