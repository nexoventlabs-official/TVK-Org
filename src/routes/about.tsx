import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { FlagStripe } from "@/components/site/FlagStripe";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useSiteLanguage } from "@/lib/site-language";
import { getSiteContent } from "@/lib/site-content";
import { useDynamicMeta } from "@/lib/useDynamicMeta";

export const Route = createFileRoute("/about")({
    head: () => ({
        meta: [
            { title: "About P. Venkataramanan — MLA Mylapore" },
            {
                name: "description",
                content:
                    "Biography, career timeline, and public service focus of P. Venkataramanan, MLA for Mylapore and School Education Minister of Tamil Nadu.",
            },
        ],
    }),
    component: AboutPage,
});

function AboutPage() {
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    useDynamicMeta(text.pageMeta.about.title, text.pageMeta.about.description);
    const p = text.aboutPage;

    return (
        <Layout>
            <FlagStripe />
            <section style={{ background: "#FFFFFF", padding: "96px 64px" }} className="about-page">
                <SectionHeader title={p.eyebrow} />
                <div
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}
                    className="about-page-grid"
                >
                    <div>
                        {p.paragraphs.map((para, i) => (
                            <p
                                key={i}
                                style={{
                                    fontFamily: "Syne",
                                    fontSize: 15,
                                    color: "#1A1A1A",
                                    lineHeight: 1.85,
                                    marginBottom: 18,
                                }}
                            >
                                {para}
                            </p>
                        ))}
                    </div>
                    <div>
                        <h3
                            style={{
                                fontFamily: "Syne",
                                fontSize: 20,
                                fontWeight: 700,
                                marginBottom: 20,
                            }}
                        >
                            {p.careerTimelineHeading}
                        </h3>
                        <div style={{ borderLeft: "2px solid #FFCC00", paddingLeft: 22 }}>
                            {p.timeline.map((it, index) => (
                                <div key={`${it.y}-${index}`} style={{ marginBottom: 22 }}>
                                    <div
                                        style={{
                                            fontFamily: "Syne",
                                            fontSize: 9,
                                            fontWeight: 600,
                                            color: "#8B0000",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.2em",
                                        }}
                                    >
                                        {it.y}
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: "Syne",
                                            fontSize: 14,
                                            color: "#1A1A1A",
                                            lineHeight: 1.7,
                                            marginTop: 4,
                                        }}
                                    >
                                        {it.t}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h3
                            style={{
                                fontFamily: "Syne",
                                fontSize: 20,
                                fontWeight: 700,
                                marginTop: 32,
                                marginBottom: 16,
                            }}
                        >
                            {p.keyAchievementsHeading}
                        </h3>
                        <ul style={{ paddingLeft: 18, margin: 0 }}>
                            {p.achievements.map((a) => (
                                <li
                                    key={a}
                                    style={{
                                        fontFamily: "Syne",
                                        fontSize: 14,
                                        color: "#1A1A1A",
                                        lineHeight: 1.85,
                                        marginBottom: 8,
                                    }}
                                >
                                    {a}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <style>{`@media (max-width: 768px) { .about-page { padding: 64px 24px !important; } .about-page-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
            </section>
            <FlagStripe />
        </Layout>
    );
}
