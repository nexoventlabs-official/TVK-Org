import { motion } from "framer-motion";
import { getSiteContent } from "@/lib/site-content";
import { useSiteLanguage } from "@/lib/site-language";

export function About() {
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    return (
        <section
            style={{ background: "#FFF8E7", padding: "clamp(72px, 8vw, 96px) 64px" }}
            className="about-root"
        >
            <div
                className="about-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: "36% 64%",
                    gap: 80,
                    alignItems: "center",
                }}
            >
                <motion.div
                    initial={{ x: -24, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5 }}
                >
                    <div
                        style={{
                            fontFamily: "Syne",
                            fontSize: 9,
                            fontWeight: 600,
                            color: "#8B0000",
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            marginBottom: 14,
                        }}
                    >
                        {text.aboutPage.eyebrow}
                    </div>
                    <h2
                        style={{
                            fontFamily: "Syne",
                            fontSize: 36,
                            fontWeight: 700,
                            color: "#1A1A1A",
                            lineHeight: 1.2,
                        }}
                    >
                        {text.aboutPage.title}
                    </h2>
                </motion.div>
                <motion.div
                    initial={{ x: 24, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5 }}
                    style={{ borderLeft: "3px solid #8B0000", paddingLeft: 28 }}
                >
                    <p
                        style={{
                            fontFamily: "Syne",
                            fontSize: 17,
                            fontWeight: 400,
                            fontStyle: "italic",
                            color: "#666",
                            lineHeight: 2,
                        }}
                    >
                        {text.aboutPage.paragraphs[1]}
                    </p>
                </motion.div>
            </div>
            <style>{`@media (max-width: 768px) { .about-root { padding: 64px 24px !important; } .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
        </section>
    );
}
