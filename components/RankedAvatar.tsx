import React from 'react';

// Avatar com fallback para iniciais quando não há foto (ou a foto falha ao carregar).
// Reutilizado no ranking (BlackBeltsShowcase), na pagina completa e no painel admin.
const RankedAvatar: React.FC<{ name: string; photoUrl?: string; sizeClass?: string }> = ({
  name,
  photoUrl,
  sizeClass = 'w-12 h-12',
}) => {
  const [failed, setFailed] = React.useState(false);

  // Reseta o estado de erro quando a foto muda (importante no painel, ao trocar de foto).
  React.useEffect(() => {
    setFailed(false);
  }, [photoUrl]);

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
    return (first + last).toUpperCase();
  };

  return (
    <div
      className={`relative ${sizeClass} rounded-full border border-[#C5A028]/25 bg-black/35 overflow-hidden shrink-0`}
    >
      {photoUrl && !failed ? (
        <img
          src={photoUrl}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="w-full h-full grid place-items-center font-black tracking-[0.12em] text-white/85">
          {getInitials(name)}
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/40"></div>
    </div>
  );
};

export default RankedAvatar;
