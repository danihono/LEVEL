
import React from 'react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#080808] border-t border-white/5 py-32 px-4 md:px-0">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-10 h-24 flex justify-start items-center">
              <Logo className="h-full" variant="light" />
            </div>
            <p className="text-zinc-500 text-sm font-light leading-relaxed mb-10 max-w-xs">{t('footer_desc')}</p>
            <div className="flex space-x-8">
              {['Instagram', 'YouTube', 'Facebook'].map(social => (
                <a key={social} href="#" className="text-zinc-600 hover:text-brand-gold transition-colors text-[9px] font-black uppercase tracking-[0.4em]">{social}</a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-black text-[9px] tracking-[0.5em] uppercase mb-10 text-brand-gold">{t('footer_nav')}</h5>
            <ul className="space-y-6">
              {[t('nav_home'), t('nav_schools'), t('nav_team'), t('nav_store'), t('nav_contact')].map(item => (
                <li key={item}><a href="#" className="text-zinc-500 text-xs font-bold tracking-widest hover:text-white transition-colors uppercase">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-black text-[9px] tracking-[0.5em] uppercase mb-10 text-brand-gold">{t('footer_corp')}</h5>
            <ul className="space-y-6">
              {['Affiliates', 'Portal', 'Jobs', 'Press'].map(item => (
                <li key={item}><a href="#" className="text-zinc-500 text-xs font-bold tracking-widest hover:text-white transition-colors uppercase">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-black text-[9px] tracking-[0.5em] uppercase mb-10 text-brand-gold">{t('nav_contact').toUpperCase()}</h5>
            <p className="text-brand-gold text-sm font-bold tracking-widest mb-4">contato@leveljiujitsu.com.br</p>
            <p className="text-zinc-500 text-xs font-light tracking-widest leading-loose">HEADQUARTER SÃO PAULO<br/>Avenida Paulista, 1000 - SP - Brasil</p>
          </div>
        </div>
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-zinc-600 text-[9px] tracking-[0.4em] uppercase font-bold">© {new Date().getFullYear()} {t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
