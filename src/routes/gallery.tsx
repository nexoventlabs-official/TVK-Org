import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import { FlagStripe } from "@/components/site/FlagStripe";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useSiteImages } from "@/lib/useSiteImages";
import { useSiteLanguage } from "@/lib/site-language";
import { getSiteContent } from "@/lib/site-content";
import { useDynamicMeta } from "@/lib/useDynamicMeta";

export const Route = createFileRoute("/gallery")({
    head: () => ({
        meta: [
            { title: "Gallery — P. Venkataramanan, MLA Mylapore" },
            {
                name: "description",
                content: "Photographs from constituency work, school visits, and TVK programmes.",
            },
        ],
    }),
    component: GalleryPage,
});

// Gallery image slots and fallbacks — tags are locale-driven at render time
const gallerySlots = [
    { slot: 'gallery_1', fallback: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778767051/venkatraman/site/gallery_1.jpg' },
    { slot: 'gallery_2', fallback: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766941/venkatraman/site/gallery_2.jpg' },
    { slot: 'gallery_3', fallback: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766949/venkatraman/site/gallery_3.jpg' },
    { slot: 'gallery_4', fallback: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766960/venkatraman/site/gallery_4.jpg' },
    { slot: 'gallery_5', fallback: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766967/venkatraman/site/gallery_5.jpg' },
    { slot: 'gallery_6', fallback: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766976/venkatraman/site/gallery_6.jpg' },
    { slot: 'gallery_7', fallback: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778767007/venkatraman/site/gallery_7.jpg' },
    { slot: 'gallery_8', fallback: null },
    { slot: 'gallery_9', fallback: null },
    { slot: 'gallery_10', fallback: null },
    { slot: 'gallery_11', fallback: null },
    { slot: 'gallery_extra_1', fallback: null },
    { slot: 'gallery_extra_2', fallback: null },
    { slot: 'gallery_extra_3', fallback: null },
    { slot: 'gallery_extra_4', fallback: null },
    { slot: 'gallery_extra_5', fallback: null },
];

function GalleryPage() {
    const { images, loading } = useSiteImages();
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    useDynamicMeta(text.pageMeta.gallery.title, text.pageMeta.gallery.description);
    const [open, setOpen] = useState<number | null>(null);

    // Merge image slots with locale-driven tags
    const allGalleryItems = gallerySlots.map((s, i) => ({
        ...s,
        tag: text.gallery[i]?.tag ?? s.slot,
        imageUrl: images[s.slot]?.url || s.fallback,
    }));

    // Only show slots that have an actual image — empty "extra" slots are
    // hidden until the admin uploads a photo for them.
    const galleryItems = allGalleryItems.filter((item) => Boolean(item.imageUrl));

    // Count how many extra slots are pending upload (for the hint at the bottom)
    const pendingCount = allGalleryItems.length - galleryItems.length;

    return (
        <Layout>
            <FlagStripe />
            <section style={{ background: "#FAFAFA", padding: "96px 64px" }} className="gal-page">
                <SectionHeader title={text.shared.gallery} />

                {loading && (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px',
                        color: 'var(--text-muted)',
                        fontFamily: 'Syne',
                        fontSize: '14px'
                    }}>
                        {text.shared.loadingGallery}
                    </div>
                )}

                <div
                    className="gal-page-grid"
                    style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 4 }}
                >
                    {galleryItems.map((item, i) => (
                        <motion.div
                            key={item.slot}
                            initial={{ scale: 0.95, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true, amount: 0.05 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            onClick={() => setOpen(i)}
                            style={{
                                height: 200,
                                background: "#E8E0D0",
                                borderRadius: 2,
                                position: "relative",
                                overflow: "hidden",
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src={item.imageUrl!}
                                alt={item.tag}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: loading ? 0.5 : 1,
                                    transition: 'opacity 0.3s ease',
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 10,
                                    left: 10,
                                    background: "rgba(0,0,0,0.55)",
                                    color: "rgba(255,255,255,0.85)",
                                    fontFamily: "Syne",
                                    fontSize: 7,
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    padding: "3px 8px",
                                    borderRadius: 1,
                                }}
                            >
                                {item.tag}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pending-upload hint — only shown while slots are unfilled */}
                {pendingCount > 0 && (
                    <div
                        style={{
                            marginTop: 24,
                            padding: "14px 20px",
                            background: "rgba(139,0,0,0.05)",
                            border: "1px dashed rgba(139,0,0,0.20)",
                            borderRadius: 4,
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            color: "rgba(139,0,0,0.65)",
                            fontFamily: "Syne",
                            fontSize: 12,
                        }}
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="4" width="18" height="16" rx="2" />
                            <circle cx="9" cy="10" r="2" />
                            <path d="M3 18l6-6 5 5 3-3 4 4" />
                        </svg>
                        {pendingCount} more photo{pendingCount > 1 ? "s" : ""} coming soon
                    </div>
                )}
                <style>{`@media (max-width: 768px) { .gal-page { padding: 64px 24px !important; } .gal-page-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
            </section>
            <FlagStripe />
            <AnimatePresence>
                {open !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(null)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.85)",
                            zIndex: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 32,
                            cursor: 'pointer',
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: "#E8E0D0",
                                maxWidth: 900,
                                width: "100%",
                                height: "70vh",
                                borderRadius: 2,
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={galleryItems[open].imageUrl!}
                                alt={galleryItems[open].tag}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 14,
                                    left: 14,
                                    background: "rgba(0,0,0,0.6)",
                                    color: "#FFF",
                                    fontFamily: "Syne",
                                    fontSize: 9,
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.12em",
                                    padding: "5px 10px",
                                    borderRadius: 1,
                                }}
                            >
                                {galleryItems[open].tag}
                            </div>
                            <button
                                onClick={() => setOpen(null)}
                                style={{
                                    position: 'absolute',
                                    top: 14,
                                    right: 14,
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    background: 'rgba(0,0,0,0.6)',
                                    border: 'none',
                                    color: '#FFF',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                }}
                            >
                                ×
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    );
}
