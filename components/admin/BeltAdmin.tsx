import React from 'react';
import RankedAvatar from '../RankedAvatar';
import {
  fetchAllBelts,
  saveBelts,
  uploadPhoto,
  newBeltId,
  sortBeltsBySeniority,
  isoToBr,
  brToIso,
  maskBrDate,
  PUBLIC_RANKING_LIMIT,
  type Belt,
} from '../../lib/blackBelts';
import { auth, ADMIN_EMAIL } from '../../lib/firebase';

const BeltAdmin: React.FC = () => {
  const [belts, setBelts] = React.useState<Belt[]>([]);
  const [serverIds, setServerIds] = React.useState<Set<string>>(new Set());
  const [removedIds, setRemovedIds] = React.useState<string[]>([]);
  // Texto BR (DD/MM/AAAA) digitado por linha; o blackBeltDate (ISO) é derivado no blur.
  const [brDates, setBrDates] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState('');
  const [savedToast, setSavedToast] = React.useState(false);
  const [uploadingId, setUploadingId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const rows = await fetchAllBelts();
      setBelts(rows);
      setServerIds(new Set(rows.map((r) => r.id)));
      setBrDates(Object.fromEntries(rows.map((r) => [r.id, isoToBr(r.blackBeltDate)])));
      setRemovedIds([]);
    } catch (err) {
      console.error('[BeltAdmin] falha ao carregar:', err);
      const code = (err as { code?: string })?.code;
      const detail = code ? ` (${code})` : '';
      setLoadError(`Não foi possível carregar${detail}. Verifique a conexão e tente de novo.`);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const update = (id: string, patch: Partial<Belt>) =>
    setBelts((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));

  const toggleLeader = (id: string) =>
    setBelts((prev) => {
      const current = prev.find((b) => b.id === id);
      const makeLeader = !current?.isLeader;
      return prev.map((b) => ({ ...b, isLeader: b.id === id ? makeLeader : false }));
    });

  const toggleActive = (id: string) =>
    setBelts((prev) => prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b)));

  const removeBelt = (id: string) => {
    const belt = belts.find((b) => b.id === id);
    if (belt && belt.name.trim() && !window.confirm(`Remover "${belt.name}" do ranking?`)) return;
    setBelts((prev) => prev.filter((b) => b.id !== id));
    if (serverIds.has(id)) setRemovedIds((prev) => [...prev, id]);
  };

  const addBelt = () => {
    const id = newBeltId();
    setBelts((prev) => [
      ...prev,
      {
        id,
        position: prev.length + 1,
        name: '',
        photoUrl: '',
        blackBeltDate: '',
        isLeader: false,
        isActive: true,
      },
    ]);
    setBrDates((prev) => ({ ...prev, [id]: '' }));
  };

  const onPickPhoto = async (id: string, file: File | undefined) => {
    if (!file) return;
    setUploadingId(id);
    setSaveError('');
    try {
      const url = await uploadPhoto(file, id);
      update(id, { photoUrl: url });
    } catch (err) {
      setSaveError((err as Error)?.message || 'Falha ao enviar a foto.');
    } finally {
      setUploadingId(null);
    }
  };

  const save = async () => {
    if (saving) return;
    const missing = belts.find((b) => !b.name.trim());
    if (missing) {
      setSaveError('Todos os faixas pretas precisam de um nome.');
      return;
    }
    setSaving(true);
    setSaveError('');
    try {
      await saveBelts(belts, removedIds);
      await load();
      setSavedToast(true);
      window.setTimeout(() => setSavedToast(false), 2500);
    } catch (err) {
      const code = (err as { code?: string })?.code;
      const loggedEmail = auth.currentUser?.email ?? '(não logado)';
      console.error('[BeltAdmin] falha ao salvar:', err, '| logado como:', loggedEmail, '| esperado:', ADMIN_EMAIL);
      if (code === 'permission-denied') {
        setSaveError(
          `Sem permissão. Você está logado como "${loggedEmail}" e a regra exige "${ADMIN_EMAIL}" — precisam ser idênticos.`,
        );
      } else {
        const detail = code ? ` (${code})` : '';
        setSaveError(`Não foi possível salvar${detail}. Verifique a conexão e tente de novo.`);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-16 text-center text-white/55">Carregando…</div>;
  }

  if (loadError) {
    return (
      <div className="py-16 text-center">
        <p className="text-white/65">{loadError}</p>
        <button onClick={load} className="bb-btn mt-5 rounded-full px-6 py-3 text-sm font-semibold">
          Tentar de novo
        </button>
      </div>
    );
  }

  return (
    <div className="pb-28">
      <p className="text-sm text-white/55">
        A ordem é <b className="text-white/80">automática pela data da faixa preta</b>: quem é faixa preta
        há mais tempo fica em <b className="text-white/80">#1</b>. Os{' '}
        <b className="text-white/80">{PUBLIC_RANKING_LIMIT} primeiros ativos</b> aparecem na home; todos
        os ativos aparecem no <b className="text-white/80">“Saiba mais”</b>.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {sortBeltsBySeniority(belts).map((b, idx) => (
          <div
            key={b.id}
            className={[
              'rounded-2xl border bg-black/25 p-4 md:p-5',
              b.isActive ? 'border-[#C5A028]/16' : 'border-white/8 opacity-60',
            ].join(' ')}
          >
            <div className="flex items-start gap-3 md:gap-4">
              {/* Rank (automático pela antiguidade) */}
              <div className="flex flex-col items-center justify-center min-w-[40px] pt-1">
                <span className="text-3xl font-black text-brand-gold leading-none">#{idx + 1}</span>
              </div>

              {/* Foto */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <RankedAvatar name={b.name || '?'} photoUrl={b.photoUrl || undefined} sizeClass="w-16 h-16" />
                <label className="cursor-pointer text-[11px] font-semibold text-brand-gold hover:underline">
                  {uploadingId === b.id ? 'Enviando…' : 'Trocar foto'}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    disabled={uploadingId === b.id}
                    onChange={(e) => {
                      onPickPhoto(b.id, e.target.files?.[0]);
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>

              {/* Campos */}
              <div className="flex-1 min-w-0">
                <input
                  value={b.name}
                  onChange={(e) => update(b.id, { name: e.target.value })}
                  placeholder="Nome"
                  className="w-full rounded-lg border border-[#C5A028]/20 bg-black/40 px-3 py-2 font-bold outline-none focus:border-[#F1D592]/50"
                />

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <label className="text-xs text-white/55 shrink-0">Faixa preta desde</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="DD/MM/AAAA"
                    maxLength={10}
                    value={brDates[b.id] ?? isoToBr(b.blackBeltDate)}
                    onChange={(e) => {
                      const masked = maskBrDate(e.target.value);
                      setBrDates((prev) => ({ ...prev, [b.id]: masked }));
                    }}
                    onBlur={() => {
                      const iso = brToIso(brDates[b.id] ?? '');
                      update(b.id, { blackBeltDate: iso });
                      setBrDates((prev) => ({ ...prev, [b.id]: isoToBr(iso) }));
                    }}
                    className="w-[130px] rounded-lg border border-[#C5A028]/15 bg-black/40 px-3 py-2 text-sm text-white/80 outline-none focus:border-[#F1D592]/40"
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => toggleLeader(b.id)}
                    className={[
                      'rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors',
                      b.isLeader
                        ? 'border-[#F1D592]/50 bg-[#C5A028]/15 text-brand-gold'
                        : 'border-[#C5A028]/20 bg-black/30 text-white/60 hover:text-white/85',
                    ].join(' ')}
                  >
                    {b.isLeader ? '★ Líder' : '☆ Líder'}
                  </button>

                  <button
                    onClick={() => toggleActive(b.id)}
                    className={[
                      'rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors',
                      b.isActive
                        ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                        : 'border-white/15 bg-black/30 text-white/50',
                    ].join(' ')}
                  >
                    {b.isActive ? 'Ativo' : 'Inativo'}
                  </button>

                  <button
                    onClick={() => removeBelt(b.id)}
                    className="ml-auto rounded-full px-3 py-1.5 text-xs font-semibold border border-red-500/25 bg-black/30 text-red-400/85 hover:bg-red-500/10 transition-colors"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addBelt}
        className="mt-4 w-full rounded-2xl border border-dashed border-[#C5A028]/30 bg-black/20 px-4 py-4 text-sm font-semibold text-brand-gold hover:bg-black/30 transition-colors"
      >
        + Adicionar faixa preta
      </button>

      {/* Barra fixa de salvar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-[#C5A028]/14 bg-[#0b0b0b]/90 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-3 flex items-center gap-3">
          <div className="text-sm min-h-[1.25rem]">
            {saveError ? (
              <span className="text-red-400">{saveError}</span>
            ) : savedToast ? (
              <span className="text-emerald-300">✓ Salvo!</span>
            ) : (
              <span className="text-white/45">{belts.length} faixa(s) preta(s)</span>
            )}
          </div>
          <button
            onClick={save}
            disabled={saving || uploadingId !== null}
            className="bb-btn gold-glow ml-auto rounded-full px-7 py-3 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Salvando…' : 'Salvar alterações'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeltAdmin;
