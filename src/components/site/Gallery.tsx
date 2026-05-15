import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useSiteImages } from "@/lib/useSiteImages";
import { getSiteContent } from "@/lib/site-content";
import { useSiteLanguage } from "@/lib/site-language";

const Cell = ({ tag, i, imageUrl }: { tag: string; i: number; imageUrl: string }) => (
    <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4, delay: i * 0.06 }}
        style={{
            background: "linear-gradient(135deg, #F7F2EA 0%, #EFE6D8 100%)",
            borderRadius: 10,
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            height: "100%",
            border: "1px solid #E8E0D0",
            boxShadow: "0 10px 24px rgba(139, 0, 0, 0.06)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseEnter={(e) => {
            const o = e.currentTarget.querySelector<HTMLElement>(".gov");
            if (o) o.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 16px 34px rgba(139, 0, 0, 0.1)";
        }}
        onMouseLeave={(e) => {
            const o = e.currentTarget.querySelector<HTMLElement>(".gov");
            if (o) o.style.opacity = "0";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 24px rgba(139, 0, 0, 0.06)";
        }}
    >
        <img
            src={imageUrl}
            alt={tag}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
            }}
        />
        <div
            className="gov"
            style={{
                position: "absolute",
                inset: 0,
                background:
                    "linear-gradient(160deg, rgba(139,0,0,0.10) 0%, rgba(255,204,0,0.08) 100%)",
                opacity: 0,
                transition: "opacity 0.25s",
            }}
        />
        <div
            style={{
                position: "absolute",
                inset: "auto 0 0 0",
                height: 44,
                background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(139,0,0,0.72) 100%)",
                zIndex: 1,
            }}
        />
        <div
            style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                background: "rgba(255,255,255,0.92)",
                color: "#8B0000",
                fontFamily: "Public Sans",
                fontSize: 7,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                padding: "4px 8px",
                borderRadius: 999,
                zIndex: 2,
                boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
            }}
        >
            {tag}
        </div>
    </motion.div>
);

export function Gallery() {
    const { images, loading } = useSiteImages();
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    
    // Fallback images if not loaded from backend
    const galleryImages = [
        { 
            tag: text.gallery[0].tag, 
            url: images.gallery_1?.url || "https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778767051/venkatraman/site/gallery_1.jpg" 
        },
        { 
            tag: text.gallery[1].tag, 
            url: images.gallery_2?.url || "https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766941/venkatraman/site/gallery_2.jpg" 
        },
        { 
            tag: text.gallery[2].tag, 
            url: images.gallery_3?.url || "https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766949/venkatraman/site/gallery_3.jpg" 
        },
        { 
            tag: text.gallery[3].tag, 
            url: images.gallery_4?.url || "https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766960/venkatraman/site/gallery_4.jpg" 
        },
        { 
            tag: text.gallery[4].tag, 
            url: images.gallery_5?.url || "https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766967/venkatraman/site/gallery_5.jpg" 
        },
        { 
            tag: text.gallery[5].tag, 
            url: images.gallery_6?.url || "https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766976/venkatraman/site/gallery_6.jpg" 
        },
        { 
            tag: text.gallery[6].tag, 
            url: images.gallery_7?.url || "https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778767007/venkatraman/site/gallery_7.jpg" 
        },
    ];

    return (
        <section
            style={{ background: "var(--bg-off)", padding: "clamp(72px, 8vw, 96px) 64px" }}
            className="gallery-root"
        >
            <SectionHeader title={text.shared.gallery} link={{ label: text.shared.viewAll, to: "/gallery" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 40 }}>
                <div
                    className="gal-row1"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr",
                        gap: 4,
                        height: 220,
                    }}
                >
                    <Cell tag={galleryImages[0].tag} i={0} imageUrl={galleryImages[0].url} />
                    <Cell tag={galleryImages[1].tag} i={1} imageUrl={galleryImages[1].url} />
                    <Cell tag={galleryImages[2].tag} i={2} imageUrl={galleryImages[2].url} />
                </div>
                <div
                    className="gal-row2"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4,1fr)",
                        gap: 4,
                        height: 130,
                    }}
                >
                    <Cell tag={galleryImages[3].tag} i={3} imageUrl={galleryImages[3].url} />
                    <Cell tag={galleryImages[4].tag} i={4} imageUrl={galleryImages[4].url} />
                    <Cell tag={galleryImages[5].tag} i={5} imageUrl={galleryImages[5].url} />
                    <Cell tag={galleryImages[6].tag} i={6} imageUrl={galleryImages[6].url} />
                </div>
            </div>
            <style>{`
        @media (max-width: 1024px) {
          .gallery-root { padding: 64px 40px !important; }
          .gal-row1 { height: 200px !important; }
          .gal-row2 { height: 120px !important; }
        }
        
        @media (max-width: 768px) {
          .gallery-root { padding: 56px 24px !important; }
          .gal-row1 { grid-template-columns: 1fr 1fr !important; height: 180px !important; }
          .gal-row1 > div:nth-child(3) { grid-column: span 2; }
          .gal-row2 { grid-template-columns: 1fr 1fr !important; height: 110px !important; }
        }
        
        @media (max-width: 480px) {
          .gallery-root { padding: 48px 16px !important; }
          .gal-row1 { grid-template-columns: 1fr !important; height: auto !important; gap: 8px !important; }
          .gal-row1 > div { height: 160px !important; }
          .gal-row1 > div:nth-child(3) { grid-column: span 1; }
          .gal-row2 { grid-template-columns: 1fr !important; height: auto !important; gap: 8px !important; }
          .gal-row2 > div { height: 160px !important; }
        }
      `}</style>
        </section>
    );
}
