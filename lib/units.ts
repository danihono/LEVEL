// Unidades reais da Level. Cada unidade tem uma lista de fotos: a primeira é a
// fachada (mostrada parada) e as demais (tatame, interior...) aparecem ao passar
// o mouse. Para adicionar mais fotos a uma unidade, basta colocar o arquivo em
// public/images/ e incluir o caminho no array `photos`.
export interface Unit {
  id: string;
  city: string;
  name: string;
  address: string;
  photos: string[];
}

const CAMPINAS_ADDRESS = 'Av. Artur Paioli, 297 - Parque Taquaral, Campinas - SP';

export const units: Unit[] = [
  {
    id: 'campinas',
    city: 'CAMPINAS',
    name: 'LEVEL CAMPINAS',
    address: CAMPINAS_ADDRESS,
    photos: ['/images/campinas-fachada.png', '/images/campinas.jpeg'],
  },
  {
    id: 'taquaral',
    city: 'CAMPINAS',
    name: 'LEVEL TAQUARAL',
    address: 'Av. Almeida Garret, 380',
    photos: ['/images/almeidagarret.jpeg'],
  },
  {
    id: 'cambui',
    city: 'CAMPINAS - CAMBUÍ',
    name: 'LEVEL CAMBUÍ',
    address: 'R. Maria Monteiro, 744 - Cambuí, Campinas - SP, 13025-152',
    photos: ['/images/cambui-fachada.png', '/images/cambui.jpeg'],
  },
  {
    id: 'jaguariuna',
    city: 'JAGUARIÚNA',
    name: 'LEVEL JAGUARIÚNA',
    address: 'R. João Roberto Pires Bueno, 148 - Cruzeiro do Sul, Jaguariúna - SP',
    photos: ['/images/jaguariuna.png'],
  },
];

// Link do Google Maps gerado a partir do endereço (sempre cai no pino certo).
export const mapsUrl = (address: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
