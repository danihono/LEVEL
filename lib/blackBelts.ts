// Camada de dados do ranking de faixas pretas (site).
// Tudo isolado na coleção `site_faixasPretas` (Firestore) e na pasta `site/faixas/` (Storage).
import {
  collection,
  getDocs,
  writeBatch,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, firebaseReady } from './firebase';

export const COLLECTION = 'site_faixasPretas';
export const PUBLIC_RANKING_LIMIT = 6;

export type Belt = {
  id: string;
  position: number; // rank em cache (recalculado pela data ao salvar; 1 = topo)
  name: string;
  subtitle: string;
  photoUrl: string; // vazio => mostra iniciais
  blackBeltDate: string; // data da faixa preta (YYYY-MM-DD); vazio => sem data
  isLeader: boolean; // badge "Lider" + destaque dourado
  isActive: boolean; // false => some do site, mas continua no cadastro
};

type BeltData = Omit<Belt, 'id'>;

function mapDoc(id: string, data: Record<string, unknown>): Belt {
  const p = Number(data.position);
  return {
    id,
    position: Number.isFinite(p) ? p : 999,
    name: String(data.name ?? ''),
    subtitle: String(data.subtitle ?? ''),
    photoUrl: String(data.photoUrl ?? ''),
    blackBeltDate: String(data.blackBeltDate ?? ''),
    isLeader: Boolean(data.isLeader),
    isActive: data.isActive === undefined ? true : Boolean(data.isActive),
  };
}

/** Desempate estável: posição salva e depois nome. */
function tieBreak(a: Belt, b: Belt): number {
  if (a.position !== b.position) return a.position - b.position;
  return a.name.localeCompare(b.name);
}

/**
 * Ordena por antiguidade de faixa preta: data mais ANTIGA primeiro (#1).
 * Quem não tem data fica no fim. As datas em ISO (YYYY-MM-DD) ordenam
 * cronologicamente por comparação de string.
 */
export function sortBeltsBySeniority(belts: Belt[]): Belt[] {
  return [...belts].sort((a, b) => {
    const da = a.blackBeltDate || '';
    const db = b.blackBeltDate || '';
    if (da && db) return da !== db ? (da < db ? -1 : 1) : tieBreak(a, b);
    if (da && !db) return -1;
    if (!da && db) return 1;
    return tieBreak(a, b);
  });
}

/** Converte ISO (AAAA-MM-DD) para BR (DD/MM/AAAA). '' se inválido. */
export function isoToBr(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${m[3]}/${m[2]}/${m[1]}` : '';
}

/** Converte BR (DD/MM/AAAA) para ISO (AAAA-MM-DD). '' se incompleto/inválido. */
export function brToIso(br: string): string {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec((br || '').trim());
  if (!m) return '';
  const [, dd, mm, yyyy] = m;
  const d = Number(dd);
  const mo = Number(mm);
  const y = Number(yyyy);
  // valida data real (rejeita 31/02, 00/00, etc.)
  const date = new Date(y, mo - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return '';
  return `${yyyy}-${mm}-${dd}`;
}

/** Aplica a máscara DD/MM/AAAA conforme o usuário digita (só números). */
export function maskBrDate(input: string): string {
  const digits = (input || '').replace(/\D/g, '').slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean);
  return parts.join('/');
}

/**
 * Ranking fixo usado como fallback instantâneo (render sem flash) e quando o Firebase
 * não está disponível (offline / sem config). Espelha o conteúdo atual da seção.
 */
export function getFallbackBelts(baseUrl: string, rankName: string, rankSub: string): Belt[] {
  return Array.from({ length: 6 }, (_, i) => {
    const position = i + 1;
    const photoUrl =
      position === 1
        ? `${baseUrl}images/adriano.jpg`
        : position === 2
          ? `${baseUrl}images/ricardo.jpg`
          : position === 3
            ? `${baseUrl}images/alba.jpg`
            : '';
    return {
      id: `fallback-${position}`,
      position,
      name: `${rankName} ${position}`,
      subtitle: rankSub,
      photoUrl,
      blackBeltDate: '',
      isLeader: position === 1,
      isActive: true,
    };
  });
}

/**
 * Faixas pretas ATIVAS, ordenadas por antiguidade (faixa preta mais antiga primeiro).
 * Lê a coleção inteira (pequena) e ordena/filtra no código — sem índice no Firestore.
 */
export async function fetchPublicBelts(): Promise<Belt[]> {
  if (!firebaseReady) throw new Error('firebase-not-configured');
  const snap = await getDocs(collection(db, COLLECTION));
  const belts = snap.docs.map((d) => mapDoc(d.id, d.data())).filter((b) => b.isActive);
  return sortBeltsBySeniority(belts);
}

/** TODAS as faixas pretas (inclui inativas), por antiguidade — usado no painel admin. */
export async function fetchAllBelts(): Promise<Belt[]> {
  if (!firebaseReady) throw new Error('firebase-not-configured');
  const snap = await getDocs(collection(db, COLLECTION));
  return sortBeltsBySeniority(snap.docs.map((d) => mapDoc(d.id, d.data())));
}

/** Gera um id de documento Firestore para uma faixa preta nova (antes de salvar). */
export function newBeltId(): string {
  return doc(collection(db, COLLECTION)).id;
}

/**
 * Salva a lista inteira de uma vez (batch). Ordena por antiguidade (mais antigo = #1),
 * grava `position` como o rank em cache e remove os ids passados em `removedIds`.
 */
export async function saveBelts(belts: Belt[], removedIds: string[] = []): Promise<void> {
  if (!firebaseReady) throw new Error('firebase-not-configured');
  const batch = writeBatch(db);

  sortBeltsBySeniority(belts).forEach((b, i) => {
    const data: BeltData & { updatedAt: unknown } = {
      position: i + 1,
      name: b.name.trim(),
      subtitle: b.subtitle.trim(),
      photoUrl: b.photoUrl || '',
      blackBeltDate: b.blackBeltDate || '',
      isLeader: !!b.isLeader,
      isActive: !!b.isActive,
      updatedAt: serverTimestamp(),
    };
    batch.set(doc(db, COLLECTION, b.id), data);
  });

  removedIds.forEach((id) => batch.delete(doc(db, COLLECTION, id)));

  await batch.commit();
}

/**
 * Reduz a imagem no navegador antes do upload (lado maior ~512px, JPEG q~0.82).
 * Fotos de celular de ~1MB caem para dezenas de KB. Mantém proporção.
 */
async function resizeImage(file: File, maxEdge = 512, quality = 0.82): Promise<Blob> {
  const dataUrl: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('read-failed'));
    reader.readAsDataURL(file);
  });

  const img: HTMLImageElement = await new Promise((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error('image-failed'));
    el.src = dataUrl;
  });

  const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return file; // fallback: envia original
  ctx.drawImage(img, 0, 0, w, h);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/jpeg', quality),
  );
  return blob ?? file;
}

/**
 * Envia a foto pro Storage (pasta isolada do site) e devolve a URL pública.
 * Aceita jpeg/png/webp; redimensiona antes pra ficar leve.
 */
export async function uploadPhoto(file: File, beltId: string): Promise<string> {
  if (!firebaseReady) throw new Error('firebase-not-configured');
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (file.type && !allowed.includes(file.type)) {
    throw new Error('Formato inválido. Use JPG, PNG ou WEBP.');
  }
  const resized = await resizeImage(file);
  const path = `site/faixas/${beltId}-${Date.now()}.jpg`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, resized, { contentType: 'image/jpeg' });
  return await getDownloadURL(storageRef);
}
