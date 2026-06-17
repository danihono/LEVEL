import React from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth, firebaseReady } from '../../lib/firebase';
import AdminLogin from './AdminLogin';
import BeltAdmin from './BeltAdmin';

const backToSite = () => {
  window.location.hash = '';
};

const AdminApp: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (!firebaseReady) {
      setReady(true);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
    return unsub;
  }, []);

  // Firebase não configurado (ex.: dev sem .env). Avisa em vez de quebrar.
  if (!firebaseReady) {
    return (
      <div className="min-h-screen grid place-items-center px-4 bg-[#0b0b0b] text-center">
        <div className="max-w-md">
          <h1 className="text-xl font-extrabold text-brand-gold">Painel indisponível</h1>
          <p className="mt-3 text-white/65 text-sm">
            O Firebase não está configurado neste ambiente. Defina as variáveis
            <code className="mx-1 text-white/80">VITE_FIREBASE_*</code> (ver
            <code className="mx-1 text-white/80">.env.example</code>) e recarregue.
          </p>
          <button onClick={backToSite} className="bb-btn mt-6 rounded-full px-6 py-3 text-sm font-semibold">
            ← Voltar ao site
          </button>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#0b0b0b] text-white/55">Carregando…</div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <header className="sticky top-0 z-20 border-b border-[#C5A028]/14 bg-[#0b0b0b]/85 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[10px] tracking-[0.18em] uppercase text-white/45">Painel · Level Jiu Jitsu</div>
            <div className="text-sm font-bold truncate">Ranking de Faixas Pretas</div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={backToSite}
              className="rounded-full border border-[#C5A028]/25 bg-black/30 px-4 py-2 text-xs font-semibold text-white/80 hover:text-white hover:border-[#F1D592]/40 transition-colors"
            >
              Ver site
            </button>
            <button
              onClick={() => signOut(auth)}
              className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-semibold text-white/70 hover:text-white transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 md:px-6 py-6">
        <BeltAdmin />
      </main>
    </div>
  );
};

export default AdminApp;
