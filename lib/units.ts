// Unidades reais da Level. Cada unidade tem uma lista de fotos: a primeira é a
// fachada (mostrada parada) e as demais (tatame, interior...) aparecem ao passar
// o mouse. Para adicionar mais fotos a uma unidade, basta colocar o arquivo em
// public/images/ e incluir o caminho no array `photos`.
// Obs.: o id 'campinas' é legado — a unidade hoje se chama LEVEL TAQUARAL.
export interface Unit {
  id: string;
  city: string;
  name: string;
  address: string;
  photos: string[];
  // Número de WhatsApp da unidade, só dígitos, no formato aceito pelo wa.me
  // (código do país + DDD + número).
  whatsapp: string;
}

const CAMPINAS_ADDRESS = 'Av. Artur Paioli, 297 - Parque Taquaral, Campinas - SP';

export const units: Unit[] = [
  {
    id: 'campinas',
    city: 'CAMPINAS',
    name: 'LEVEL TAQUARAL CAMPINAS',
    address: CAMPINAS_ADDRESS,
    photos: ['/images/campinas-fachada.png', '/images/campinas.jpeg'],
    whatsapp: '5519996670777',
  },
  {
    id: 'taquaral',
    city: 'CAMPINAS',
    name: 'LEVEL KIDS TAQUARAL CAMPINAS',
    address: 'Av. Almeida Garret, 380',
    photos: ['/images/almeidagarret.jpeg'],
    whatsapp: '5519996670777',
  },
  {
    id: 'cambui',
    city: 'CAMPINAS - CAMBUÍ',
    name: 'LEVEL CAMBUÍ CAMPINAS',
    address: 'R. Maria Monteiro, 744 - Cambuí, Campinas - SP, 13025-152',
    photos: ['/images/cambui-fachada.png', '/images/cambui.jpeg'],
    whatsapp: '5519974075861',
  },
  {
    id: 'jaguariuna',
    city: 'JAGUARIÚNA',
    name: 'LEVEL JAGUARIÚNA',
    address: 'R. João Roberto Pires Bueno, 148 - Cruzeiro do Sul, Jaguariúna - SP',
    photos: ['/images/jaguariuna.png'],
    whatsapp: '5519953218036',
  },
];

// Link do Google Maps gerado a partir do endereço (sempre cai no pino certo).
export const mapsUrl = (address: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

// WhatsApp geral do site (botão flutuante e menu) — unidade Cambuí.
export const MAIN_WHATSAPP = '5519974075861';

export const WHATSAPP_MESSAGE = 'Olá! Vim pelo site da Level Jiu Jitsu.';

export const whatsappUrl = (phone: string, message = WHATSAPP_MESSAGE): string =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
