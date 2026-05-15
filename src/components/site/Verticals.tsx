import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { getSiteContent } from "@/lib/site-content";
import { useSiteLanguage } from "@/lib/site-language";

export function Verticals() {
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    const data = text.verticals;
    return (
        <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E0D0" }}>
            <div
                style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}
                className="vertical-grid"
            >
                {data.map((c, i) => (
                    <motion.div
                        key={c.n}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.5, delay: i * 0.12 }}
                        style={{
                            padding: "clamp(40px, 5vw, 52px) 36px",
                            borderRight: i < 2 ? "1px solid #E8E0D0" : "none",
                            cursor: "pointer",
                            transition:
                                "background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
                            position: "relative",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = "rgba(139,0,0,0.02)";
                            el.style.transform = "translateY(-3px)";
                            el.style.boxShadow = "0 12px 26px rgba(139,0,0,0.06)";
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = "transparent";
                            el.style.transform = "translateY(0)";
                            el.style.boxShadow = "none";
                        }}
                    >
                        <div
                            style={{
                                fontFamily: "Syne",
                                fontSize: 10,
                                color: "#9A9A9A",
                                letterSpacing: "0.16em",
                                marginBottom: 18,
                            }}
                        >
                            {c.n}
                        </div>
                        <div
                            style={{
                                display: "inline-block",
                                fontFamily: "Syne",
                                fontSize: 8,
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.14em",
                                padding: "4px 10px",
                                borderRadius: 2,
                                marginBottom: 14,
                                background: c.badgeBg,
                                color: c.color,
                            }}
                        >
                            {c.badge}
                        </div>
                        <h3
                            style={{
                                fontFamily: "Syne",
                                fontSize: 20,
                                fontWeight: 700,
                                color: "#1A1A1A",
                                marginBottom: 12,
                            }}
                        >
                            {c.title}
                        </h3>
                        <p
                            style={{
                                fontFamily: "Syne",
                                fontSize: 13,
                                color: "#4B4B4B",
                                lineHeight: 1.75,
                                marginBottom: 24,
                            }}
                        >
                            {c.desc}
                        </p>
                        <Link
                            to={c.to}
                            style={{
                                fontFamily: "Syne",
                                fontSize: 11,
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: c.color,
                                transition: "opacity 0.2s, transform 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.opacity = "0.72";
                                el.style.transform = "translateX(2px)";
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.opacity = "1";
                                el.style.transform = "translateX(0)";
                            }}
                        >
                            {c.cta}
                        </Link>
                        <div
                            style={{
                                height: 2,
                                width: 36,
                                borderRadius: 1,
                                marginTop: 20,
                                background: c.color,
                            }}
                        />
                    </motion.div>
                ))}
            </div>
            <style>{`@media (max-width: 768px) { .vertical-grid { grid-template-columns: 1fr !important; } .vertical-grid > div { border-right: none !important; border-bottom: 1px solid #E8E0D0; } }`}</style>
        </section>
    );
}
