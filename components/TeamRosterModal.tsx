import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import RankedAvatar from './RankedAvatar';
import { isoToBr, type Belt } from '../lib/blackBelts';

// Lista completa de faixas pretas, aberta pelo botão "Saiba mais".
// Recebe os faixas pretas ATIVOS (ordenados por posição).
const TeamRosterModal: React.FC<{
  open: boolean;
  belts: Belt[];
  leaderId?: string;
  onClose: () => void;
}> = ({ open, belts, leaderId, onClose }) => {
  const { t } = useLanguage();

  // Fecha com ESC e trava o scroll do body enquanto aberto.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-[#C5A028]/18 bg-[#0b0b0b]/95 shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 md:px-8 pt-6 pb-4 border-b border-[#C5A028]/12">
          <div>
            <div className="inline-flex items-center gap-2 bb-pill rounded-full px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
              <span className="text-[10px] md:text-xs tracking-[0.18em] uppercase text-white/80">
                {t('bb_kicker')}
              </span>
            </div>
            <h3 className="mt-3 text-2xl md:text-3xl font-extrabold leading-tight">
              {t('bb_title_prefix')} <span className="text-brand-gold">{t('bb_title_gold')}</span>
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="shrink-0 w-10 h-10 grid place-items-center rounded-full border border-[#C5A028]/25 bg-black/40 text-white/80 hover:text-white hover:border-[#F1D592]/40 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
          {belts.length === 0 ? (
            <div className="py-10 text-center text-white/55">Nenhum faixa preta cadastrado ainda.</div>
          ) : (
            <ol className="flex flex-col gap-2">
              {belts.map((b, idx) => (
                <li
                  key={b.id}
                  className="flex items-center gap-4 rounded-2xl border border-[#C5A028]/14 bg-black/25 px-4 py-3"
                >
                  <div className="min-w-[42px] text-2xl font-black tracking-tight text-white/70 text-center">
                    {idx + 1}
                  </div>
                  <RankedAvatar name={b.name} photoUrl={b.photoUrl || undefined} />
                  <div className="min-w-0 flex-1">
                    <div className="text-base md:text-lg font-bold truncate">{b.name}</div>
                    {isoToBr(b.blackBeltDate) && (
                      <div className="text-sm text-white/45 mt-0.5">desde {isoToBr(b.blackBeltDate)}</div>
                    )}
                  </div>
                  {b.id === leaderId && (
                    <span className="hidden sm:inline-flex shrink-0 items-center rounded-full border border-[#C5A028]/25 bg-black/35 px-3 py-1 text-[10px] tracking-[0.18em] uppercase text-white/75">
                      {t('bb_ranking_top')}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamRosterModal;
