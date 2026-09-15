
import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { MAIN_WHATSAPP, whatsappUrl } from '../lib/units';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={whatsappUrl(MAIN_WHATSAPP)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      title="Fale conosco no WhatsApp"
      className="fixed bottom-5 right-5 z-[70] flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:scale-110 transition-transform duration-300 group"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60 animate-ping"></span>
      <WhatsAppIcon className="relative w-6 h-6 md:w-6 md:h-6 text-white" />
    </a>
  );
};

export default WhatsAppButton;
