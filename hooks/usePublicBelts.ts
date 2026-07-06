import React from 'react';
import {
  fetchPublicBelts,
  getFallbackBelts,
  sortBeltsBySeniority,
  type Belt,
} from '../lib/blackBelts';

export function usePublicBelts(fallbackRankName: string) {
  const baseUrl = import.meta.env.BASE_URL;
  const fallbackBelts = React.useMemo(
    () => getFallbackBelts(baseUrl, fallbackRankName),
    [baseUrl, fallbackRankName],
  );

  const [belts, setBelts] = React.useState<Belt[]>(fallbackBelts);
  const [hasRemoteRows, setHasRemoteRows] = React.useState(false);

  React.useEffect(() => {
    if (!hasRemoteRows) setBelts(fallbackBelts);
  }, [fallbackBelts, hasRemoteRows]);

  React.useEffect(() => {
    let alive = true;

    const loadBelts = () =>
      fetchPublicBelts()
        .then((rows) => {
          if (!alive) return;
          setBelts(rows);
          setHasRemoteRows(true);
        })
        .catch(() => {
          // Keep the local fallback when Firebase is unavailable or not configured.
        });

    loadBelts();

    const onVisible = () => {
      if (document.visibilityState === 'visible') loadBelts();
    };

    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', loadBelts);
    return () => {
      alive = false;
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', loadBelts);
    };
  }, []);

  const activeBelts = React.useMemo(
    () => sortBeltsBySeniority(belts.filter((b) => b.isActive)),
    [belts],
  );
  const markedLeader = activeBelts.find((b) => b.isLeader);
  const leaderId = markedLeader ? markedLeader.id : activeBelts[0]?.id;

  return {
    belts,
    activeBelts,
    leaderId,
  };
}
