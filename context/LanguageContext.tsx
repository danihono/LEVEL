
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'PT' | 'EN' | 'ES';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  PT: {
    nav_home: 'HOME',
    nav_schools: 'ESCOLAS',
    nav_team: 'TEAM',
    nav_store: 'STORE',
    nav_contact: 'CONTATO',
    hero_elevate: 'ELEVE O',
    hero_jiujitsu: 'DO SEU JIU JITSU',
    hero_desc: 'Onde a tradição encontra a modernidade. Experimente o padrão LEVEL de ensino em um ambiente exclusivo desenhado para a sua evolução soberana.',
    hero_btn_units: 'ENCONTRAR UNIDADE',
    hero_btn_team: 'CONHECER O TIME',
    stats_students: 'Alunos Ativos',
    stats_years: 'De Tradição',
    stats_champs: 'Campeonatos',
    founders_title: 'NOSSOS FUNDADORES',
    founders_subtitle: 'A LINHAGEM DA SOBERANIA',
    founder_age: 'Idade',
    founder_rank: 'Graduação',
    founder_bio: 'Bio',
    action_affiliate_title: 'QUERO SER',
    action_affiliate_span: 'AFILIADO',
    action_affiliate_desc: 'Leve a soberania LEVEL para sua cidade e transforme sua academia em um centro de autoridade internacional.',
    action_student_title: 'QUERO SER',
    action_student_span: 'ALUNO',
    action_student_desc: 'Inicie sua jornada na elite do Jiu Jitsu com instrutores mestres e um ambiente de alto padrão.',
    units_title: 'AUTORIDADE',
    units_span: 'MUNDIAL',
    units_presence: 'PRESENÇA GLOBAL',
    units_btn_all: 'VER TODAS UNIDADES',
    map_locator: 'LOCALIZADOR DE ELITE',
    map_vibe: 'VIVA O PADRÃO',
    map_desc: 'Presente nos principais centros do mundo. Encontre a LEVEL e junte-se à comunidade de elite.',
    map_placeholder: 'Sua localização (Cidade ou CEP)',
    map_btn_search: 'BUSCAR',
    store_title: 'LEVEL',
    store_span: 'STORE',
    store_buy: 'COMPRAR AGORA',
    store_explore: 'EXPLORAR TODA A COLEÇÃO',
    philosophy_title: 'FILOSOFIA SOBERANA',
    philosophy_text: 'NÃO É SÓ SOBRE LUTAR.',
    philosophy_sub: 'É SOBRE ALCANÇAR A MAESTRIA.',
    news_title: 'FIQUE POR DENTRO DO',
    news_desc: 'Assine nossa newsletter exclusiva e receba notícias sobre eventos de elite e novos lançamentos.',
    news_placeholder: 'Seu melhor e-mail',
    news_btn: 'INSCREVER',
    footer_desc: 'Elevando o padrão global através de uma metodologia de elite e um lifestyle focado na soberania humana.',
    footer_nav: 'NAVEGAÇÃO',
    footer_corp: 'CORPORATIVO',
    footer_rights: 'LEVEL JIU JITSU GLOBAL. SOBERANIA & TRADIÇÃO.'
  },
  EN: {
    nav_home: 'HOME',
    nav_schools: 'SCHOOLS',
    nav_team: 'TEAM',
    nav_store: 'STORE',
    nav_contact: 'CONTACT',
    hero_elevate: 'ELEVATE YOUR',
    hero_jiujitsu: 'JIU JITSU LEVEL',
    hero_desc: 'Where tradition meets modernity. Experience the LEVEL standard of teaching in an exclusive environment designed for your sovereign evolution.',
    hero_btn_units: 'FIND A UNIT',
    hero_btn_team: 'MEET THE TEAM',
    stats_students: 'Active Students',
    stats_years: 'Years of Tradition',
    stats_champs: 'Championships',
    founders_title: 'OUR FOUNDERS',
    founders_subtitle: 'THE SOVEREIGNTY LINEAGE',
    founder_age: 'Age',
    founder_rank: 'Rank',
    founder_bio: 'Bio',
    action_affiliate_title: 'BECOME AN',
    action_affiliate_span: 'AFFILIATE',
    action_affiliate_desc: 'Bring LEVEL sovereignty to your city and transform your academy into an international center of authority.',
    action_student_title: 'BECOME A',
    action_student_span: 'STUDENT',
    action_student_desc: 'Start your journey in the Jiu Jitsu elite with master instructors and a high-standard environment.',
    units_title: 'WORLDWIDE',
    units_span: 'AUTHORITY',
    units_presence: 'GLOBAL PRESENCE',
    units_btn_all: 'VIEW ALL UNITS',
    map_locator: 'ELITE LOCATOR',
    map_vibe: 'LIVE THE',
    map_desc: 'Present in the world\'s main centers. Find LEVEL and join the elite community.',
    map_placeholder: 'Your location (City or ZIP)',
    map_btn_search: 'SEARCH',
    store_title: 'LEVEL',
    store_span: 'STORE',
    store_buy: 'BUY NOW',
    store_explore: 'EXPLORE FULL COLLECTION',
    philosophy_title: 'SOVEREIGN PHILOSOPHY',
    philosophy_text: 'IT\'S NOT JUST ABOUT FIGHTING.',
    philosophy_sub: 'IT\'S ABOUT ACHIEVING MASTERY.',
    news_title: 'STAY INSIDE THE',
    news_desc: 'Subscribe to our exclusive newsletter and receive news about elite events and new releases.',
    news_placeholder: 'Your best e-mail',
    news_btn: 'SUBSCRIBE',
    footer_desc: 'Elevating the global standard through an elite methodology and a lifestyle focused on human sovereignty.',
    footer_nav: 'NAVIGATION',
    footer_corp: 'CORPORATE',
    footer_rights: 'LEVEL JIU JITSU GLOBAL. SOVEREIGNTY & TRADITION.'
  },
  ES: {
    nav_home: 'INICIO',
    nav_schools: 'ESCUELAS',
    nav_team: 'EQUIPO',
    nav_store: 'TIENDA',
    nav_contact: 'CONTACTO',
    hero_elevate: 'ELEVA EL',
    hero_jiujitsu: 'DE TU JIU JITSU',
    hero_desc: 'Donde la tradición se encuentra con la modernidade. Experimenta el estándar LEVEL de enseñanza en un ambiente exclusivo diseñado para tu evolución soberana.',
    hero_btn_units: 'ENCONTRAR UNIDAD',
    hero_btn_team: 'CONOCER EL EQUIPO',
    stats_students: 'Alumnos Activos',
    stats_years: 'Años de Tradición',
    stats_champs: 'Campeonatos',
    founders_title: 'NUESTROS FUNDADORES',
    founders_subtitle: 'EL LINAJE DE LA SOBERANÍA',
    founder_age: 'Edad',
    founder_rank: 'Graduación',
    founder_bio: 'Bio',
    action_affiliate_title: 'QUIERO SER',
    action_affiliate_span: 'AFILIADO',
    action_affiliate_desc: 'Lleva la soberanía LEVEL a tu ciudad y transforma tu academia en um centro de autoridad internacional.',
    action_student_title: 'QUIERO SER',
    action_student_span: 'ALUMNO',
    action_student_desc: 'Inicia tu viaje en la élite del Jiu Jitsu con instructores maestros y un ambiente de alto nivel.',
    units_title: 'AUTORIDAD',
    units_span: 'MUNDIAL',
    units_presence: 'PRESENCIA GLOBAL',
    units_btn_all: 'VER TODAS LAS UNIDADES',
    map_locator: 'LOCALIZADOR DE ELITE',
    map_vibe: 'VIVE EL ESTÁNDAR',
    map_desc: 'Presente en los principales centros do mundo. Encuentra LEVEL y únete a la comunidad de élite.',
    map_placeholder: 'Tu ubicación (Ciudad o CP)',
    map_btn_search: 'BUSCAR',
    store_title: 'LEVEL',
    store_span: 'STORE',
    store_buy: 'COMPRAR AHORA',
    store_explore: 'EXPLORAR TODA LA COLECCIÓN',
    philosophy_title: 'FILOSOFÍA SOBERANA',
    philosophy_text: 'NO SE TRATA SÓLO DE LUCHAR.',
    philosophy_sub: 'SE TRATA DE ALCANZAR LA MAESTRÍA.',
    news_title: 'MANTENTE DENTRO DEL',
    news_desc: 'Suscríbete a nuestro boletín exclusivo y recibe noticias sobre eventos de élite y nuevos lanzamentos.',
    news_placeholder: 'Tu mejor correo',
    news_btn: 'SUSCRIBIRSE',
    footer_desc: 'Elevando el estándar global a través de uma metodología de élite y um estilo de vida centrado en la soberanía humana.',
    footer_nav: 'NAVEGACIÓN',
    footer_corp: 'CORPORATIVO',
    footer_rights: 'LEVEL JIU JITSU GLOBAL. SOBERANÍA Y TRADICIÓN.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('PT');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
