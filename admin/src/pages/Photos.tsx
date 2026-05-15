import { useEffect, useMemo, useRef, useState } from 'react';
import { Upload, Trash2, Image as ImageIcon, Info, AlertCircle, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';
import api from '../lib/api';

/**
 * Photos page — every "uploadable image slot" the public site exposes
 * is rendered as a card. Empty slots show a dashed-border drop zone;
 * filled slots show the image with the option to replace or remove.
 *
 * The slot catalog is defined once on the backend
 * (config/imageSlots.js) so we don't duplicate the list of slots here.
 */

type Aspect = 'portrait' | 'landscape' | 'square' | 'wide';

interface SlotImage {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  updatedAt: string;
}

interface Slot {
  slot: string;
  group: string;
  label: string;
  description: string;
  aspect: Aspect;
  recommendedSize?: string;
  image: SlotImage | null;
}

interface Toast {
  type: 'ok' | 'err';
  msg: string;
}

const ASPECT_RATIO: Record<Aspect, string> = {
  portrait: '0.93 / 1',  // Hero: almost square, slightly taller
  landscape: '2 / 1',     // Gallery 2-3, Gallery Extra: landscape
  square: '1 / 1',        // Not used, kept for compatibility
  wide: '4 / 1',          // Gallery 1, News Featured: ultra-wide
};

// Maximum height for preview cards to prevent oversized displays
const MAX_PREVIEW_HEIGHT: Record<Aspect, string> = {
  portrait: '320px',
  landscape: '180px',
  square: '240px',
  wide: '140px',
};

function formatBytes(b: number) {
  if (!b) return '';
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}

export default function Photos() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<Record<string, 'upload' | 'delete' | undefined>>({});
  const [toast, setToast] = useState<Toast | null>(null);
  const [cloudOk, setCloudOk] = useState(true);

  // Group slots by their `group` key for nicer rendering.
  const groups = useMemo(() => {
    const map: Record<string, Slot[]> = {};
    for (const s of slots) {
      (map[s.group] ||= []).push(s);
    }
    return Object.entries(map);
  }, [slots]);

  const fetchAll = async () => {
    try {
      const r: any = await api.get('/admin/site-images');
      setSlots(r.data.items || []);
      setCloudOk(Boolean(r.data.cloudinaryConfigured));
    } catch (err: any) {
      setToast({ type: 'err', msg: err?.message || 'Failed to load images' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Auto-dismiss toast after 4s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const upload = async (slotKey: string, file: File) => {
    setBusy((b) => ({ ...b, [slotKey]: 'upload' }));
    try {
      const fd = new FormData();
      fd.append('file', file);
      const r: any = await api.post(`/admin/site-images/${slotKey}`, fd);
      setSlots((prev) =>
        prev.map((s) => (s.slot === slotKey ? { ...s, image: r.data.image } : s))
      );
      setToast({ type: 'ok', msg: `Uploaded ${file.name}` });
    } catch (err: any) {
      setToast({ type: 'err', msg: err?.message || 'Upload failed' });
    } finally {
      setBusy((b) => ({ ...b, [slotKey]: undefined }));
    }
  };

  const remove = async (slotKey: string) => {
    if (!confirm('Remove this image? The public site will fall back to its placeholder.')) return;
    setBusy((b) => ({ ...b, [slotKey]: 'delete' }));
    try {
      await api.delete(`/admin/site-images/${slotKey}`);
      setSlots((prev) => prev.map((s) => (s.slot === slotKey ? { ...s, image: null } : s)));
      setToast({ type: 'ok', msg: 'Image removed' });
    } catch (err: any) {
      setToast({ type: 'err', msg: err?.message || 'Delete failed' });
    } finally {
      setBusy((b) => ({ ...b, [slotKey]: undefined }));
    }
  };

  if (loading) {
    return (
      <div className="text-cream/40 text-xs uppercase tracking-[0.2em] py-12 text-center">
        Loading photo slots…
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* ── Help banner ── */}
      <div className="card p-4 flex items-start gap-3">
        <Info size={14} className="text-brand-gold mt-0.5 shrink-0" />
        <div className="text-[12px] text-cream/70 leading-relaxed">
          <strong className="text-cream">Manage the imagery on the public site.</strong> Every
          card below is one image slot. Upload a JPEG / PNG / WebP (≤8&nbsp;MB) and it will
          appear on the public site within ~30 seconds. Re-uploading replaces the previous
          image; removing falls back to the design's grey placeholder. All assets are stored on
          Cloudinary.
          <div className="mt-2 text-brand-gold/70 text-[11px]">
            💡 <strong>Tip:</strong> Use the recommended dimensions for best quality. Images will be automatically optimized by Cloudinary.
          </div>
        </div>
      </div>

      {!cloudOk && (
        <div className="card p-4 flex items-start gap-3 border-rose-500/40 bg-rose-500/6">
          <AlertCircle size={14} className="text-rose-300 mt-0.5 shrink-0" />
          <div className="text-[12px] text-rose-200 leading-relaxed">
            Cloudinary is not configured on the backend. Set{' '}
            <code className="text-rose-100">CLOUDINARY_CLOUD_NAME</code> /{' '}
            <code className="text-rose-100">CLOUDINARY_API_KEY</code> /{' '}
            <code className="text-rose-100">CLOUDINARY_API_SECRET</code> in{' '}
            <code className="text-rose-100">backend/.env</code> and restart the server.
          </div>
        </div>
      )}

      {/* ── Slot groups ── */}
      {groups.map(([group, list]) => (
        <section key={group} className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-cream font-display font-bold text-sm">{group}</h2>
            <div className="text-[10px] uppercase tracking-[0.14em] text-cream/35">
              {list.filter((s) => s.image).length} / {list.length} filled
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {list.map((s) => (
              <SlotCard
                key={s.slot}
                slot={s}
                busy={busy[s.slot]}
                onUpload={(file) => upload(s.slot, file)}
                onDelete={() => remove(s.slot)}
              />
            ))}
          </div>
        </section>
      ))}

      {/* ── Toast ── */}
      {toast && (
        <div
          className={[
            'fixed bottom-6 right-6 z-50 max-w-sm card flex items-start gap-2 px-4 py-3 shadow-2xl',
            toast.type === 'ok'
              ? 'border-emerald-500/40 bg-emerald-500/8'
              : 'border-rose-500/40 bg-rose-500/8',
          ].join(' ')}
        >
          {toast.type === 'ok' ? (
            <CheckCircle2 size={14} className="text-emerald-300 mt-0.5 shrink-0" />
          ) : (
            <AlertCircle size={14} className="text-rose-300 mt-0.5 shrink-0" />
          )}
          <div className="text-[12px] text-cream">{toast.msg}</div>
        </div>
      )}
    </div>
  );
}

/* ─── Single image-slot card ─────────────────────────────── */

function SlotCard({
  slot,
  busy,
  onUpload,
  onDelete,
}: {
  slot: Slot;
  busy?: 'upload' | 'delete';
  onUpload: (file: File) => void;
  onDelete: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [drag, setDrag] = useState(false);

  const handlePick = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      alert('Image is too large (max 8 MB)');
      return;
    }
    onUpload(file);
  };

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.14em] text-cream/40 truncate">
            {slot.slot}
          </div>
          <div className="text-cream font-semibold text-[13px] leading-tight">{slot.label}</div>
          {slot.recommendedSize && (
            <div className="text-[10px] text-brand-gold/80 mt-1 flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              {slot.recommendedSize}
            </div>
          )}
        </div>
        <div className="text-[9px] uppercase tracking-[0.14em] text-cream/35 shrink-0">
          {slot.aspect}
        </div>
      </div>

      <p className="text-[11px] text-cream/55 leading-relaxed">{slot.description}</p>

      {/* Preview / drop zone */}
      <div
        className={[
          'relative w-full overflow-hidden rounded-sm border transition-colors',
          slot.image
            ? 'border-cream/10 bg-ink-0'
            : drag
              ? 'border-brand-gold bg-cream/[0.05]'
              : 'border-dashed border-cream/15 bg-cream/[0.02]',
        ].join(' ')}
        style={{ 
          aspectRatio: ASPECT_RATIO[slot.aspect],
          maxHeight: MAX_PREVIEW_HEIGHT[slot.aspect]
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!slot.image) setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          handlePick(e.dataTransfer.files?.[0]);
        }}
      >
        {slot.image ? (
          <img
            src={slot.image.url}
            alt={slot.label}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-cream/40">
            <ImageIcon size={20} />
            <div className="text-[10px] uppercase tracking-[0.14em]">No image yet</div>
            <div className="text-[10px] text-cream/30">Drop or click to upload</div>
          </div>
        )}

        {busy === 'upload' && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Loader2 size={20} className="text-cream animate-spin" />
          </div>
        )}
      </div>

      {/* Metadata */}
      {slot.image && (
        <div className="flex items-center justify-between text-[10px] text-cream/40">
          <span>
            {slot.image.format?.toUpperCase()} · {slot.image.width}×{slot.image.height}
            {slot.image.bytes ? ` · ${formatBytes(slot.image.bytes)}` : ''}
          </span>
          <a
            href={slot.image.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-cream"
            title="Open original on Cloudinary"
          >
            <ExternalLink size={10} />
            Open
          </a>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handlePick(e.target.files?.[0]);
          e.target.value = ''; // allow re-uploading same file
        }}
      />

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="button"
          disabled={!!busy}
          onClick={() => inputRef.current?.click()}
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-8 rounded-sm bg-brand-gold/[0.18] text-brand-gold text-[11px] uppercase tracking-[0.14em] font-semibold border border-brand-gold/30 hover:bg-brand-gold/[0.28] disabled:opacity-50"
        >
          <Upload size={12} />
          {slot.image ? 'Replace' : 'Upload'}
        </button>
        <button
          type="button"
          disabled={!slot.image || !!busy}
          onClick={onDelete}
          className="inline-flex items-center justify-center w-8 h-8 rounded-sm border border-cream/15 text-cream/55 hover:text-rose-300 hover:border-rose-400/40 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Remove image"
        >
          {busy === 'delete' ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
        </button>
      </div>
    </div>
  );
}
