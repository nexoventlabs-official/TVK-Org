import { Layout } from "./Layout";
import { FlagStripe } from "./FlagStripe";
import { EnquiryForm, type Variant } from "./EnquiryForm";
import { motion } from "framer-motion";
import { useSiteLanguage } from "@/lib/site-language";
import { getSiteContent } from "@/lib/site-content";

type Props = {
    variant: Variant;
    color: string;
    eyebrow: string;
    title: string;
    paragraphs: string[];
    news: { date: string; title: string }[];
};

export function VerticalPage({ variant, color, eyebrow, title, paragraphs, news }: Props) {
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    return (
        <Layout>
            <FlagStripe />
            <div style={{ height: 8, background: color, width: "100%" }} />
            <section
                style={{ background: "#FFFFFF", padding: "clamp(64px, 7vw, 88px) 64px 40px" }}
                className="v-hero"
            >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div
                        style={{
                            fontFamily: "Syne",
                            fontSize: 9,
                            fontWeight: 600,
                            color,
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            marginBottom: 14,
                        }}
                    >
                        {eyebrow}
                    </div>
                    <h1
                        style={{
                            fontFamily: "Syne",
                            fontSize: 48,
                            fontWeight: 700,
                            color,
                            lineHeight: 1.15,
                            marginBottom: 28,
                            maxWidth: 760,
                        }}
                    >
                        {title}
                    </h1>
                    <div style={{ maxWidth: 760 }}>
                        {paragraphs.map((p, i) => (
                            <p
                                key={i}
                                style={{
                                    fontFamily: "Syne",
                                    fontSize: 15,
                                    color: "#1A1A1A",
                                    lineHeight: 1.85,
                                    marginBottom: 16,
                                }}
                            >
                                {p}
                            </p>
                        ))}
                    </div>
                </motion.div>
            </section>

            <section
                style={{ background: "#FAFAFA", padding: "clamp(64px, 7vw, 88px) 64px" }}
                className="v-form"
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                    <div style={{ width: 4, height: 36, background: color, borderRadius: 2 }} />
                    <h2
                        style={{
                            fontFamily: "Syne",
                            fontSize: 30,
                            fontWeight: 700,
                            color: "#1A1A1A",
                        }}
                    >
                        {text.shared.submitRequest}
                    </h2>
                </div>
                <div style={{ maxWidth: 560 }}>
                    <EnquiryForm variant={variant} />
                </div>
            </section>

            <section
                style={{ background: "#FFFFFF", padding: "clamp(64px, 7vw, 88px) 64px" }}
                className="v-news"
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                    <div style={{ width: 4, height: 36, background: color, borderRadius: 2 }} />
                    <h2
                        style={{
                            fontFamily: "Syne",
                            fontSize: 30,
                            fontWeight: 700,
                            color: "#1A1A1A",
                        }}
                    >
                        {text.shared.recentUpdates}
                    </h2>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 1,
                        background: "#E8E0D0",
                    }}
                    className="v-news-grid"
                >
                    {news.map((n) => (
                        <article key={n.title} style={{ background: "#FFFFFF", padding: 28 }}>
                            <div
                                style={{
                                    fontFamily: "Syne",
                                    fontSize: 9,
                                    fontWeight: 700,
                                    color,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.16em",
                                    marginBottom: 10,
                                }}
                            >
                                {eyebrow.split("·")[0].trim()}
                            </div>
                            <h3
                                style={{
                                    fontFamily: "Syne",
                                    fontSize: 17,
                                    fontWeight: 700,
                                    color: "#1A1A1A",
                                    lineHeight: 1.5,
                                    marginBottom: 14,
                                }}
                            >
                                {n.title}
                            </h3>
                            <div style={{ fontFamily: "Syne", fontSize: 11, color: "#6B6B6B" }}>
                                {n.date}
                            </div>
                        </article>
                    ))}
                </div>
            </section>
            <FlagStripe />
            <style>{`@media (max-width: 768px) {
        .v-hero, .v-form, .v-news { padding: 56px 24px !important; }
        .v-hero h1 { font-size: 32px !important; }
        .v-news-grid { grid-template-columns: 1fr !important; }
      }`}</style>
        </Layout>
    );
}
