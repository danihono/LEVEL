import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, ADMIN_EMAIL } from '../../lib/firebase';
import Logo from '../Logo';

// Tela de login do painel. Pro dono é só "digitar a senha" — o email do admin fica
// fixo no código (ADMIN_EMAIL) e é usado por baixo no Firebase Auth.
const AdminLogin: React.FC = () => {
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || loading) return;
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
      // O onAuthStateChanged no AdminApp assume daqui e mostra o editor.
    } catch (err) {
      const code = (err as { code?: string })?.code ?? '';
      if (code === 'auth/too-many-requests') {
        setError('Muitas tentativas. Aguarde um momento e tente de novo.');
      } else if (code === 'auth/network-request-failed') {
        setError('Sem conexão. Verifique a internet e tente de novo.');
      } else {
        setError('Senha incorreta.');
      }
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid place-items-center px-4 bg-[#0b0b0b]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-[#C5A028]/18 bg-black/40 backdrop-blur-xl p-7 md:p-8"
      >
        <div className="flex justify-center">
          <Logo className="h-12 w-auto" />
        </div>

        <h1 className="mt-6 text-center text-xl font-extrabold">Painel da Equipe</h1>
        <p className="mt-1.5 text-center text-sm text-white/55">
          Digite a senha para editar o ranking de faixas pretas.
        </p>

        <label className="mt-7 block text-[11px] tracking-[0.18em] uppercase text-white/55">
          Senha
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="current-password"
          className="mt-2 w-full rounded-xl border border-[#C5A028]/25 bg-black/45 px-4 py-3 text-white outline-none focus:border-[#F1D592]/50"
          placeholder="••••••••"
        />

        {error && <div className="mt-3 text-sm text-red-400">{error}</div>}

        <button
          type="submit"
          disabled={loading || !password}
          className="bb-btn gold-glow mt-6 w-full rounded-full px-6 py-3.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>

        <a
          href="#"
          className="mt-5 block text-center text-xs text-white/45 hover:text-white/70 transition-colors"
        >
          ← Voltar ao site
        </a>
      </form>
    </div>
  );
};

export default AdminLogin;
