// Inicialização do Firebase para a parte do SITE.
// Reaproveita o mesmo projeto Firebase do "sistema" da academia, mas a parte do
// site é totalmente isolada: usa apenas a coleção `site_faixasPretas` no Firestore
// e a pasta `site/faixas/` no Storage (ver lib/blackBelts.ts e as regras de segurança).
//
// A config web do Firebase (apiKey, etc.) é PÚBLICA por natureza — pode ir no JS do
// site sem problema. A proteção real vem das Security Rules. Mantemos os valores em
// variáveis de ambiente (.env) apenas por organização (ver .env.example).
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// `import.meta.env` é tipado de forma estrita pelo Vite; lemos via Record pra evitar
// erros de TS com chaves customizadas.
const env = import.meta.env as unknown as Record<string, string | undefined>;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

// Indica se o Firebase está configurado. Quando não está (ex.: dev sem .env), o site
// continua funcionando em modo "fallback" (ranking fixo) e o painel avisa que falta config.
export const firebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Banco Firestore NOMEADO e separado pro site (isolado do banco "(default)" do sistema).
// Por que: o `firebase deploy` do sistema publica regras só do banco "(default)" — então
// um banco nomeado próprio tem regras independentes que o deploy do sistema NÃO derruba.
// Override por env; default 'site'. (O banco precisa ser criado no Console com esse mesmo id.)
const firestoreDb = env.VITE_FIRESTORE_DB || 'site';

export const db = getFirestore(app, firestoreDb);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Email fixo do ÚNICO usuário admin do painel. O dono digita só a senha na tela de login;
// este email fica "escondido" aqui e é usado por baixo no signInWithEmailAndPassword.
// As Security Rules liberam escrita apenas para este email, na coleção/pasta do site.
export const ADMIN_EMAIL = env.VITE_ADMIN_EMAIL || 'contato@leveljiujitsu.com.br';
