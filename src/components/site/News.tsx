import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { getSiteContent } from "@/lib/site-content";
import { useSiteLanguage } from "@/lib/site-language";

const ImgPlaceholder = ({ h = 200 }: { h?: number }) => (
    <div
        style={{
            height: h,
            background: "#F5F0E8",
            borderRadius: 2,
            marginBottom: 20,
            border: "1px solid #E8E0D0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <svg
            viewBox="0 0 24 24"
            width="36"
            height="36"
            fill="none"
            stroke="#CCCCCC"
            strokeWidth="1"
        >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="2" />
            <path d="M3 18l6-6 5 5 3-3 4 4" />
        </svg>
    </div>
);

export function News() {
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    const items = text.hero.news.items;

    return (
        <section
            style={{ background: "#FFFFFF", padding: "clamp(72px, 8vw, 96px) 64px" }}
            className="news-root"
        >
            <SectionHeader title={text.shared.latestNews} link={{ label: text.shared.viewAll, to: "/news" }} />
            <div
                className="news-grid"
                style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 18 }}
            >
                {items.map((item, index) => (
                    <motion.article
                        key={item.title}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        style={{
                            background: "#FFFFFF",
                            border: "1px solid #E8E0D0",
                            borderRadius: 12,
                            overflow: "hidden",
                            boxShadow: "0 14px 32px rgba(139, 0, 0, 0.05)",
                            padding: 0,
                            minHeight: item.featured ? 470 : 390,
                            display: "flex",
                            flexDirection: "column",
                            transition: "transform 0.25s ease, box-shadow 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = "translateY(-4px)";
                            el.style.boxShadow = "0 20px 44px rgba(139, 0, 0, 0.09)";
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = "translateY(0)";
                            el.style.boxShadow = "0 14px 32px rgba(139, 0, 0, 0.05)";
                        }}
                    >
                        <div
                            style={{
                                height: item.featured ? 210 : 150,
                                background: `linear-gradient(135deg, ${item.categoryBg} 0%, #FFFDF8 56%, rgba(255,204,0,0.08) 100%)`,
                                borderBottom: "1px solid #F0E8D8",
                                position: "relative",
                            }}
                        >
                            <ImgPlaceholder h={item.featured ? 210 : 150} />
                            <div
                                style={{
                                    position: "absolute",
                                    top: 16,
                                    left: 16,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    background: "#FFFFFF",
                                    border: `1px solid ${item.categoryColor}22`,
                                    borderRadius: 999,
                                    padding: "6px 12px",
                                    boxShadow: "0 8px 18px rgba(0,0,0,0.04)",
                                }}
                            >
                                <span
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: 4,
                                        background: item.categoryColor,
                                    }}
                                />
                                <span
                                    style={{
                                        fontFamily: "Public Sans",
                                        fontSize: 9,
                                        fontWeight: 700,
                                        color: item.categoryColor,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.16em",
                                    }}
                                >
                                    {item.category}
                                </span>
                            </div>
                        </div>
                        <div
                            style={{
                                padding: item.featured ? "26px 26px 28px" : "22px 22px 24px",
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                                flex: 1,
                            }}
                        >
                            <h3
                                style={{
                                    fontFamily: "Syne",
                                    fontSize: item.featured ? 26 : 18,
                                    fontWeight: 700,
                                    color: "#1A1A1A",
                                    lineHeight: item.featured ? 1.35 : 1.5,
                                    margin: 0,
                                }}
                            >
                                {item.title}
                            </h3>
                            <div
                                style={{
                                    marginTop: "auto",
                                    fontFamily: "Public Sans",
                                    fontSize: 11,
                                    color: "#6B6B6B",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                }}
                            >
                                {item.date}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
            <style>{`
        @media (max-width: 1024px) { .news-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 768px) { .news-root { padding: 64px 24px !important; } .news-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </section>
    );
}
