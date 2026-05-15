import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useSiteImages } from "@/lib/useSiteImages";
import { getSiteContent } from "@/lib/site-content";
import { useSiteLanguage } from "@/lib/site-language";

const PersonIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="44"
        height="44"
        fill="none"
        stroke="rgba(255,204,0,0.35)"
        strokeWidth="1.5"
    >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
);

const Designation = ({ title, sub, first }: { title: string; sub: string; first?: boolean }) => (
    <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
            padding: "14px 0",
            borderBottom: "1px solid #F5EDE0",
            borderTop: first ? "1px solid #F5EDE0" : undefined,
        }}
    >
        <div>
            <div
                style={{
                    fontFamily: "Syne",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1A1A1A",
                }}
            >
                {title}
            </div>
            <div
                style={{
                    fontFamily: '"Public Sans", sans-serif',
                    fontSize: 10,
                    color: "#6B6B6B",
                    marginTop: 2,
                }}
            >
                {sub}
            </div>
        </div>
    </motion.div>
);

const Btn = ({
    children,
    primary,
    to,
    hash,
}: {
    children: React.ReactNode;
    primary?: boolean;
    to: "/" | "/about";
    hash?: string;
}) => {
    const base = {
        fontFamily: '"Public Sans", sans-serif',
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase" as const,
        letterSpacing: "0.12em",
        padding: "13px 26px",
        borderRadius: 2,
        transition: "all 0.2s ease",
        display: "inline-block",
    };
    const s = primary
        ? { ...base, background: "var(--tvk-red)", color: "var(--tvk-yellow)" }
        : {
              ...base,
              border: "1.5px solid var(--tvk-red)",
              color: "var(--tvk-red)",
              background: "transparent",
              fontWeight: 600,
          };
    return (
        <Link
            to={to}
            hash={hash}
            style={s}
            onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                if (primary) {
                    el.style.background = "var(--tvk-red-hover)";
                    el.style.transform = "translateY(-1px)";
                } else {
                    el.style.background = "var(--bg-red)";
                }
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                if (primary) {
                    el.style.background = "var(--tvk-red)";
                    el.style.transform = "translateY(0)";
                } else {
                    el.style.background = "transparent";
                }
            }}
        >
            {children}
        </Link>
    );
};

export function Hero() {
    const { images, loading } = useSiteImages();
    const { language } = useSiteLanguage();
    const text = getSiteContent(language).hero;
    
    // Fallback to reference image if not loaded yet
    const heroImage = images.hero_portrait?.url || 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766551/venkatraman/site/hero_portrait.png';
    
    return (
        <section
            style={{
                minHeight: "100vh",
                background: "#FFFFFF",
                display: "grid",
                gridTemplateColumns: "52% 48%",
                overflow: "hidden",
            }}
            className="hero-grid"
        >
            {/* LEFT */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                    background: "#8B0000",
                    position: "relative",
                    overflow: "hidden",
                    minHeight: "100vh",
                }}
                className="hero-left"
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(160deg, #6b0000 0%, var(--tvk-red) 45%, #9a1010 100%)",
                    }}
                >
                    <img
                        src={heroImage}
                        alt="P. Venkataramanan"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center top",
                            opacity: loading ? 0.5 : 1,
                            transition: "opacity 0.3s ease",
                        }}
                    />
                </div>
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 10px)",
                        pointerEvents: "none",
                        zIndex: 2,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 6,
                        background: "var(--tvk-yellow)",
                        zIndex: 5,
                    }}
                />
            </motion.div>

            {/* RIGHT */}
            <div
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(45deg, #FFFFFF 0px, #FFFFFF 12px, rgba(139, 0, 0, 0.15) 12px, rgba(139, 0, 0, 0.15) 14px, rgba(255, 204, 0, 0.12) 14px, rgba(255, 204, 0, 0.12) 16px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "72px 52px 56px 64px",
                    position: "relative",
                    borderLeft: "1px solid #F0E8D8",
                }}
                className="hero-right"
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: "var(--tvk-red)",
                    }}
                />

                {/* Name Section - Moved from left side */}
                <motion.div
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ marginBottom: 32 }}
                >
                    <div
                        style={{
                            fontFamily: '"Public Sans", sans-serif',
                            fontSize: 9,
                            color: "#7A2020",
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            marginBottom: 8,
                        }}
                    >
                        MLA · Mylapore
                    </div>
                    <div
                        className="hero-name"
                        style={{
                            fontFamily: "Syne",
                            fontSize: 28,
                            fontWeight: 900,
                            color: "var(--text)",
                            lineHeight: 1.05,
                        }}
                    >
                        P. <span style={{ color: "var(--tvk-red)" }}>VENKATARAMANAN</span>
                    </div>
                    <div
                        style={{
                            width: 64,
                            height: 4,
                            background: "var(--tvk-yellow)",
                            borderRadius: 1,
                            marginTop: 12,
                        }}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "var(--bg-yellow)",
                        border: "1px solid rgba(139,0,0,0.15)",
                        borderRadius: 2,
                        padding: "6px 14px",
                        marginBottom: 24,
                        width: "fit-content",
                    }}
                >
                    <div style={{ width: 16, display: "flex", flexDirection: "column", gap: 2 }}>
                        <div style={{ height: 3, background: "var(--tvk-red)", borderRadius: 1 }} />
                        <div style={{ height: 3, background: "var(--tvk-yellow)", borderRadius: 1 }} />
                        <div style={{ height: 3, background: "var(--tvk-red)", borderRadius: 1 }} />
                    </div>
                    <span
                        style={{
                            fontFamily: '"Public Sans", sans-serif',
                            fontSize: 9,
                            fontWeight: 600,
                            color: "var(--tvk-red)",
                            textTransform: "uppercase",
                            letterSpacing: "0.14em",
                        }}
                    >
                        {text.eyebrow}
                    </span>
                </motion.div>

                <motion.div
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    style={{
                        maxWidth: 560,
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        borderRadius: 6,
                        boxShadow: "0 18px 40px rgba(139, 0, 0, 0.06)",
                        padding: 28,
                        marginBottom: 24,
                    }}
                >
                    <div style={{ marginBottom: 22 }}>
                        <div
                            style={{
                                fontFamily: '"Public Sans", sans-serif',
                                fontSize: 9,
                                color: "#7A2020",
                                textTransform: "uppercase",
                                letterSpacing: "0.18em",
                                marginBottom: 10,
                            }}
                        >
                            {text.about.heading}
                        </div>
                        <div
                            className="hero-tagline"
                            style={{
                                fontFamily: "Syne",
                                fontSize: 38,
                                fontWeight: 900,
                                lineHeight: language === "ta" ? 1.5 : 1.05,
                                color: "var(--text)",
                                marginBottom: 12,
                            }}
                        >
                            {text.title}
                        </div>
                        <div
                            style={{
                                fontFamily: "Syne",
                                fontSize: 15,
                                lineHeight: 1.7,
                                color: "var(--text-secondary)",
                                maxWidth: 460,
                            }}
                        >
                            {text.description}
                        </div>
                    </div>

                    <div style={{ display: "grid", gap: 10, marginBottom: 22 }}>
                        {text.profileHighlights.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.35, delay: 0.55 + index * 0.08 }}
                                style={{
                                    padding: "14px 0",
                                    borderBottom: index < 2 ? "1px solid #F3EBDD" : "none",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            fontFamily: "Syne",
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: "var(--text)",
                                            lineHeight: language === "ta" ? 1.5 : 1.2,
                                        }}
                                    >
                                        {item.title}
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: '"Public Sans", sans-serif',
                                            fontSize: 11,
                                            color: "var(--text-muted)",
                                            marginTop: 3,
                                        }}
                                    >
                                        {item.sub}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.78 }}
                        className="hero-stats-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3,1fr)",
                            gap: 12,
                            marginBottom: 22,
                        }}
                    >
                        {text.stats.map(({ value, label }) => (
                            <div
                                key={label}
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid #F0E8D8",
                                    borderRadius: 4,
                                    padding: "14px 16px",
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{
                                        fontFamily: "Syne",
                                        fontSize: 24,
                                        fontWeight: 700,
                                        color: "var(--tvk-red)",
                                        lineHeight: 1,
                                    }}
                                >
                                        {value}
                                </div>
                                <div
                                    style={{
                                        fontFamily: '"Public Sans", sans-serif',
                                        fontSize: 9,
                                        color: "var(--text-muted)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        marginTop: 6,
                                    }}
                                >
                                        {label}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.88 }}
                        className="hero-ctas"
                        style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
                    >
                        <Btn primary to="/" hash="enquiry">
                            {text.ctas.primary}
                        </Btn>
                        <Btn to="/about">{text.ctas.secondary}</Btn>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.98 }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                        paddingTop: 18,
                    }}
                >
                    <span
                        style={{
                            fontFamily: '"Public Sans", sans-serif',
                            fontSize: 9,
                            color: "#8A8A8A",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                        }}
                    >
                        {language === "ta" ? "மேலும் காண" : "Scroll to explore"}
                    </span>
                    <div
                        className="scroll-bounce"
                        style={{
                            width: 22,
                            height: 22,
                            borderRadius: 11,
                            border: "1px solid #E8E0D0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="10"
                            height="10"
                            fill="none"
                            stroke="#8A8A8A"
                            strokeWidth="1.8"
                        >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                </motion.div>
            </div>

            <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-left { min-height: 50vh !important; }
          .hero-right { padding: 40px 32px !important; }
          .hero-name { font-size: 26px !important; }
        }
        
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-left { min-height: 45vh !important; }
          .hero-right { padding: 32px 24px !important; }
          .hero-name { font-size: 22px !important; }
          .hero-tagline { font-size: 26px !important; }
          .hero-right [style*="max-width: 560px"] { padding: 20px !important; margin-bottom: 18px !important; }
          .hero-stats-grid { grid-template-columns: 1fr 1fr !important; }
        }

        @media (max-width: 480px) {
          .hero-left { min-height: 40vh !important; }
          .hero-right { padding: 24px 16px !important; }
          .hero-name { font-size: 18px !important; }
          .hero-tagline { font-size: 22px !important; }
          .hero-stats-grid { grid-template-columns: 1fr !important; }
          .hero-ctas { flex-direction: column !important; }
          .hero-ctas a { width: 100% !important; text-align: center !important; }
        }
        
        @media (max-width: 414px) {
          .hero-name { font-size: 17px !important; }
        }
        
        @media (max-width: 390px) {
          .hero-name { font-size: 16px !important; }
        }
        
        @media (max-width: 375px) {
          .hero-name { font-size: 15px !important; }
        }
      `}</style>
        </section>
    );
}
